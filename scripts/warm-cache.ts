#!/usr/bin/env node
/**
 * Cache Warming Script
 * 
 * Visits all pages on the website to pre-load CloudFront cache.
 * Run this after deployment to ensure fast initial page loads for users.
 * 
 * Usage:
 *   npm run warm-cache https://stage.freedevtool.app
 *   npm run warm-cache https://freedevtool.app
 */

import { toolsData } from '../client/src/data/tools.ts';

interface WarmCacheOptions {
  baseUrl: string;
  concurrency: number;
  timeout: number;
  retries: number;
}

interface PageResult {
  url: string;
  status: number;
  time: number;
  success: boolean;
  error?: string;
}

async function fetchWithTimeout(url: string, timeout: number): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { 
      signal: controller.signal,
      headers: {
        'User-Agent': 'FreeDevTool-CacheWarmer/1.0',
      }
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

async function warmPage(url: string, options: WarmCacheOptions): Promise<PageResult> {
  const startTime = Date.now();
  
  for (let attempt = 1; attempt <= options.retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, options.timeout);
      const time = Date.now() - startTime;
      
      if (response.ok) {
        return {
          url,
          status: response.status,
          time,
          success: true,
        };
      }
      
      // Non-OK status, retry if attempts remaining
      if (attempt === options.retries) {
        return {
          url,
          status: response.status,
          time,
          success: false,
          error: `HTTP ${response.status}`,
        };
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      
    } catch (error) {
      const time = Date.now() - startTime;
      
      if (attempt === options.retries) {
        return {
          url,
          status: 0,
          time,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
  
  // Should never reach here
  return {
    url,
    status: 0,
    time: Date.now() - startTime,
    success: false,
    error: 'Max retries exceeded',
  };
}

async function warmCacheInBatches(
  urls: string[],
  options: WarmCacheOptions
): Promise<PageResult[]> {
  const results: PageResult[] = [];
  
  for (let i = 0; i < urls.length; i += options.concurrency) {
    const batch = urls.slice(i, i + options.concurrency);
    const batchResults = await Promise.all(
      batch.map(url => warmPage(url, options))
    );
    results.push(...batchResults);
    
    // Progress indicator
    const completed = Math.min(i + options.concurrency, urls.length);
    const progress = ((completed / urls.length) * 100).toFixed(0);
    console.log(`Progress: ${completed}/${urls.length} (${progress}%)`);
  }
  
  return results;
}

function getAllPageUrls(baseUrl: string): string[] {
  const urls: string[] = [];
  
  // Homepage
  urls.push(baseUrl);
  
  // All tool pages
  for (const category of Object.values(toolsData)) {
    for (const tool of category.tools) {
      urls.push(`${baseUrl}${tool.path}`);
    }
  }
  
  return urls;
}

function printResults(results: PageResult[]): void {
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log('\n' + '='.repeat(80));
  console.log('CACHE WARMING COMPLETE');
  console.log('='.repeat(80));
  
  console.log(`\nTotal pages: ${results.length}`);
  console.log(`✓ Successful: ${successful.length}`);
  console.log(`✗ Failed: ${failed.length}`);
  
  if (successful.length > 0) {
    const avgTime = successful.reduce((sum, r) => sum + r.time, 0) / successful.length;
    const minTime = Math.min(...successful.map(r => r.time));
    const maxTime = Math.max(...successful.map(r => r.time));
    
    console.log(`\nTiming Stats:`);
    console.log(`  Average: ${avgTime.toFixed(0)}ms`);
    console.log(`  Min: ${minTime}ms`);
    console.log(`  Max: ${maxTime}ms`);
  }
  
  if (failed.length > 0) {
    console.log(`\nFailed Pages:`);
    failed.forEach(result => {
      console.log(`  ✗ ${result.url}`);
      console.log(`    Error: ${result.error || 'Unknown error'}`);
    });
  }
  
  console.log('\n' + '='.repeat(80));
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('Error: Base URL required');
    console.error('Usage: npm run warm-cache <base-url>');
    console.error('Example: npm run warm-cache https://stage.freedevtool.app');
    process.exit(1);
  }
  
  const baseUrl = args[0].replace(/\/$/, ''); // Remove trailing slash
  const options: WarmCacheOptions = {
    baseUrl,
    concurrency: 5, // Concurrent requests
    timeout: 30000, // 30 second timeout
    retries: 3, // Retry failed requests
  };
  
  console.log('FreeDevTool Cache Warmer');
  console.log('='.repeat(80));
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Concurrency: ${options.concurrency}`);
  console.log(`Timeout: ${options.timeout}ms`);
  console.log(`Retries: ${options.retries}`);
  console.log('='.repeat(80));
  
  const urls = getAllPageUrls(baseUrl);
  console.log(`\nFound ${urls.length} pages to warm\n`);
  
  const startTime = Date.now();
  const results = await warmCacheInBatches(urls, options);
  const totalTime = Date.now() - startTime;
  
  printResults(results);
  console.log(`Total time: ${(totalTime / 1000).toFixed(1)}s\n`);
  
  // Exit with error code if any pages failed
  const failed = results.filter(r => !r.success);
  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
