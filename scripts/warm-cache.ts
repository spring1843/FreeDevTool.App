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

import { toolsData } from "../client/src/data/tools.ts";

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
  assetsLoaded?: number;
}

interface AssetResult {
  url: string;
  success: boolean;
  time: number;
  cacheStatus?: string;
}

async function fetchWithTimeout(
  url: string,
  timeout: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

async function extractAssetUrls(
  html: string,
  baseUrl: string
): Promise<string[]> {
  const urls = new Set<string>();

  // Extract script tags
  const scriptMatches = html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi);
  for (const match of scriptMatches) {
    const src = match[1];
    if (src.startsWith("http")) {
      urls.add(src);
    } else if (src.startsWith("/")) {
      urls.add(`${baseUrl}${src}`);
    } else {
      urls.add(`${baseUrl}/${src}`);
    }
  }

  // Extract all link tags with href (CSS, icons, etc.)
  const linkMatches = html.matchAll(/<link[^>]+href=["']([^"']+)["'][^>]*>/gi);
  for (const match of linkMatches) {
    const href = match[1];
    // Skip non-asset links (like manifests, canonical, etc.)
    if (href.startsWith("http") && !href.startsWith(baseUrl)) {
      continue; // Skip external links
    }
    if (href.startsWith("/")) {
      urls.add(`${baseUrl}${href}`);
    } else if (!href.startsWith("http")) {
      urls.add(`${baseUrl}/${href}`);
    } else {
      urls.add(href);
    }
  }

  // Extract images from common sources
  const imgMatches = html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi);
  for (const match of imgMatches) {
    const src = match[1];
    if (src.startsWith("http")) {
      urls.add(src);
    } else if (src.startsWith("/")) {
      urls.add(`${baseUrl}${src}`);
    } else {
      urls.add(`${baseUrl}/${src}`);
    }
  }

  return Array.from(urls);
}

async function warmAsset(
  url: string,
  timeout: number,
  verifyCache = false
): Promise<AssetResult> {
  const startTime = Date.now();
  try {
    const response = await fetchWithTimeout(url, timeout);
    const time = Date.now() - startTime;
    const cacheStatus = response.headers.get("x-cache") || "Unknown";
    return {
      url,
      success: response.ok,
      time,
      cacheStatus: verifyCache ? cacheStatus : undefined,
    };
  } catch {
    const time = Date.now() - startTime;
    return {
      url,
      success: false,
      time,
    };
  }
}

async function warmPage(
  url: string,
  options: WarmCacheOptions,
  downloadedAssets: Set<string>,
  downloadedPages: Set<string>,
  cacheMisses: string[],
  verifyCache = false
): Promise<PageResult> {
  const startTime = Date.now();

  for (let attempt = 1; attempt <= options.retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, options.timeout);
      const time = Date.now() - startTime;

      if (response.ok) {
        // Check cache status for verification round
        if (verifyCache) {
          const cacheStatus = response.headers.get("x-cache") || "";
          if (!cacheStatus.toLowerCase().includes("hit from cloudfront")) {
            cacheMisses.push(url);
          }
        }

        // Mark page as downloaded
        downloadedPages.add(url);

        // Fetch page content to extract assets
        const html = await response.text();
        const assetUrls = await extractAssetUrls(html, options.baseUrl);

        // Filter out already downloaded assets
        const newAssets = assetUrls.filter(
          assetUrl => !downloadedAssets.has(assetUrl)
        );

        // Warm cache for new assets in parallel
        const assetResults = await Promise.all(
          newAssets.map(assetUrl =>
            warmAsset(assetUrl, options.timeout, verifyCache)
          )
        );

        // Check cache status for assets in verification round
        if (verifyCache) {
          for (const assetResult of assetResults) {
            if (
              assetResult.cacheStatus &&
              !assetResult.cacheStatus
                .toLowerCase()
                .includes("hit from cloudfront")
            ) {
              cacheMisses.push(assetResult.url);
            }
          }
        }

        // Mark assets as downloaded
        newAssets.forEach(assetUrl => downloadedAssets.add(assetUrl));

        const successfulAssets = assetResults.filter(r => r.success).length;

        return {
          url,
          status: response.status,
          time,
          success: true,
          assetsLoaded: successfulAssets,
        };
      }

      // Non-OK status, retry if attempts remaining
      if (attempt === options.retries) {
        console.warn(`✗ Page failed with HTTP ${response.status}`);
        return {
          url,
          status: response.status,
          time,
          success: false,
          error: `HTTP ${response.status}`,
        };
      }

      // Wait before retry (exponential backoff)
      console.warn(
        `  ⟳ Retrying (attempt ${attempt + 1}/${options.retries})...`
      );
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    } catch (error) {
      const time = Date.now() - startTime;

      if (attempt === options.retries) {
        const errorMsg =
          error instanceof Error ? error.message : "Unknown error";
        console.warn(`✗ Page failed: ${errorMsg}`);
        return {
          url,
          status: 0,
          time,
          success: false,
          error: errorMsg,
        };
      }

      // Wait before retry
      console.warn(
        `  ⟳ Retrying (attempt ${attempt + 1}/${options.retries})...`
      );
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }

  // Should never reach here
  return {
    url,
    status: 0,
    time: Date.now() - startTime,
    success: false,
    error: "Max retries exceeded",
  };
}

interface WarmCacheResult {
  pageResults: PageResult[];
  downloadedAssets: Set<string>;
  downloadedPages: Set<string>;
  cacheMisses: string[];
}

async function warmCacheInBatches(
  urls: string[],
  options: WarmCacheOptions,
  verifyCache = false
): Promise<WarmCacheResult> {
  const results: PageResult[] = [];
  const downloadedAssets = new Set<string>();
  const downloadedPages = new Set<string>();
  const cacheMisses: string[] = [];

  for (let i = 0; i < urls.length; i += options.concurrency) {
    const batch = urls.slice(i, i + options.concurrency);
    const batchResults = await Promise.all(
      batch.map(url =>
        warmPage(
          url,
          options,
          downloadedAssets,
          downloadedPages,
          cacheMisses,
          verifyCache
        )
      )
    );
    results.push(...batchResults);
  }

  return {
    pageResults: results,
    downloadedAssets,
    downloadedPages,
    cacheMisses,
  };
}

function getAllPageUrls(baseUrl: string): string[] {
  const urls: string[] = [];

  // Homepage
  urls.push(baseUrl);

  // All tool pages
  for (const category of Object.values(toolsData)) {
    for (const tool of category.tools) {
      urls.push(`${baseUrl}${tool.path}`);
      urls.push(`${baseUrl}${tool.path}/`);
    }
  }

  return urls;
}

function printResults(
  results: PageResult[],
  downloadedAssets: Set<string>,
  downloadedPages: Set<string>,
  cacheMisses: string[]
): void {
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  const totalAssets = successful.reduce(
    (sum, r) => sum + (r.assetsLoaded || 0),
    0
  );

  console.warn(`\n${"=".repeat(80)}`);
  console.warn("CACHE WARMING COMPLETE");
  console.warn("=".repeat(80));

  console.warn(`\nTotal pages: ${results.length}`);
  console.warn(`✓ Successful: ${successful.length}`);
  console.warn(`✗ Failed: ${failed.length}`);
  console.warn(`📦 Assets loaded: ${totalAssets}`);
  console.warn(`📦 Unique assets cached: ${downloadedAssets.size}`);
  console.warn(
    `📄 Total resources cached: ${downloadedPages.size + downloadedAssets.size}`
  );

  if (successful.length > 0) {
    const avgTime =
      successful.reduce((sum, r) => sum + r.time, 0) / successful.length;
    const minTime = Math.min(...successful.map(r => r.time));
    const maxTime = Math.max(...successful.map(r => r.time));

    console.warn(`\nTiming Stats:`);
    console.warn(`  Average: ${avgTime.toFixed(0)}ms`);
    console.warn(`  Min: ${minTime}ms`);
    console.warn(`  Max: ${maxTime}ms`);
  }

  if (failed.length > 0) {
    console.warn(`\nFailed Pages:`);
    failed.forEach(result => {
      console.warn(`  ✗ ${result.url}`);
      console.warn(`    Error: ${result.error || "Unknown error"}`);
    });
  }

  if (cacheMisses.length > 0) {
    console.warn(
      `\n⚠️  Cache Misses (${cacheMisses.length} resources not cached by CloudFront):`
    );
    cacheMisses.sort().forEach(resource => {
      console.warn(`  ✗ ${resource}`);
    });
  }

  const allDownloaded = [
    ...Array.from(downloadedPages),
    ...Array.from(downloadedAssets),
  ].sort();

  if (allDownloaded.length > 0) {
    console.warn(`\nAll Downloaded Resources (${allDownloaded.length} total):`);
    allDownloaded.forEach(resource => {
      console.warn(`  ${resource}`);
    });
  }

  console.warn(`\n${"=".repeat(80)}`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Error: Base URL required");
    console.error("Usage: npm run warm-cache <base-url>");
    console.error("Example: npm run warm-cache https://stage.freedevtool.app");
    process.exit(1);
  }

  const baseUrl = args[0].replace(/\/$/, ""); // Remove trailing slash
  const options: WarmCacheOptions = {
    baseUrl,
    concurrency: 5, // Concurrent requests
    timeout: 30000, // 30 second timeout
    retries: 3, // Retry failed requests
  };

  console.warn("FreeDevTool Cache Warmer");
  console.warn("=".repeat(80));
  console.warn(`Base URL: ${baseUrl}`);
  console.warn(`Concurrency: ${options.concurrency}`);
  console.warn(`Timeout: ${options.timeout}ms`);
  console.warn(`Retries: ${options.retries}`);
  console.warn("=".repeat(80));

  const urls = getAllPageUrls(baseUrl);
  console.warn(`\nFound ${urls.length} pages to warm\n`);

  // First pass: warm the cache
  console.warn("=".repeat(80));
  console.warn("ROUND 1: Warming cache...");
  console.warn("=".repeat(80));

  const startTime = Date.now();
  const firstPass = await warmCacheInBatches(urls, options, false);
  const firstPassTime = Date.now() - startTime;

  console.warn(`\nRound 1 complete in ${(firstPassTime / 1000).toFixed(1)}s`);
  console.warn(
    `Cached ${firstPass.downloadedPages.size} pages and ${firstPass.downloadedAssets.size} assets\n`
  );

  // Second pass: verify cache hits
  console.warn("=".repeat(80));
  console.warn("ROUND 2: Verifying cache hits...");
  console.warn("=".repeat(80));

  const verifyStartTime = Date.now();
  const { pageResults, downloadedAssets, downloadedPages, cacheMisses } =
    await warmCacheInBatches(urls, options, true);
  const verifyTime = Date.now() - verifyStartTime;
  const totalTime = Date.now() - startTime;

  console.warn(`\nRound 2 complete in ${(verifyTime / 1000).toFixed(1)}s`);

  printResults(pageResults, downloadedAssets, downloadedPages, cacheMisses);
  console.warn(`Total time: ${(totalTime / 1000).toFixed(1)}s\n`);

  // Exit with error code if any pages failed or cache misses found
  const failed = pageResults.filter(r => !r.success);
  process.exit(failed.length > 0 || cacheMisses.length > 0 ? 1 : 0);
}

main().catch(error => {
  console.error("Fatal error:", error);
  process.exit(1);
});
