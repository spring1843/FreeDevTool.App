# Static Deployment Guide

This application is designed to be deployed as a fully static website to any static hosting platform. No backend server is required in production.

## Building for Production

### Static Site Build

Run the static site generation build:

```bash
make build
```

This command:

1. Builds the Vite frontend application
2. Generates SEO-optimized HTML files for all 47 routes
3. Creates the proper directory structure in `dist/public/`
4. Embeds unique meta tags (title, description, keywords, Open Graph) for each tool

### Build Output

The build creates the following structure in `dist/public/`:

```
dist/public/
├── index.html                 # Homepage with SEO metadata
├── assets/                    # JavaScript, CSS, and image assets
│   ├── index-[hash].js       # Main application bundle
│   ├── index-[hash].css      # Styles
│   └── ...                    # Other chunked assets
├── tools/                     # Tool pages with SEO metadata
│   ├── json-formatter/
│   │   └── index.html        # JSON Formatter tool page
│   ├── date-converter/
│   │   └── index.html        # Date Converter tool page
│   └── ...                    # 44 more tool directories
├── favicon.ico
├── robots.txt
└── sitemap.xml
```

Each `index.html` file contains:

- Unique, descriptive page title
- SEO-optimized meta description
- Relevant keywords
- Open Graph tags for social sharing
- Content Security Policy headers
- References to the main application bundles

### Build Size

The complete static build is approximately **2.6 MB** including:

- All 46 tools
- React and UI libraries
- Code formatting engines (Prettier)
- All assets and icons

## Deployment Options

### AWS S3 + CloudFront

1. **Create S3 Bucket:**

   ```bash
   aws s3 mb s3://your-bucket-name
   ```

2. **Configure for Static Website Hosting:**

   ```bash
   aws s3 website s3://your-bucket-name --index-document index.html
   ```

3. **Upload Files:**

   ```bash
   aws s3 sync dist/public/ s3://your-bucket-name --delete
   ```

4. **Set up CloudFront** (recommended for HTTPS and CDN):
   - Create CloudFront distribution
   - Point origin to S3 bucket
   - Configure custom domain (optional)
   - Add SSL certificate via ACM

5. **Configure Cache Headers:**
   Add cache control headers for better performance:
   ```bash
   aws s3 cp dist/public/assets/ s3://your-bucket-name/assets/ \
     --recursive \
     --cache-control "public, max-age=31536000, immutable"
   ```

### Netlify

1. **Install Netlify CLI:**

   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   netlify deploy --prod --dir=dist/public
   ```

Or use Netlify's web interface:

- Drag and drop the `dist/public` folder
- Or connect your Git repository and set build command to `make build`

### Vercel

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

Configuration in `vercel.json`:

```json
{
  "buildCommand": "make build",
  "outputDirectory": "dist/public",
  "cleanUrls": true
}
```

### GitHub Pages

1. **Build Locally:**

   ```bash
   make build
   ```

2. **Deploy to gh-pages Branch:**
   ```bash
   npm install -g gh-pages
   gh-pages -d dist/public
   ```

Or use GitHub Actions (recommended) - see `.github/workflows/deploy.yml`

### Azure Static Web Apps

1. **Create Static Web App** in Azure Portal

2. **Deploy via CLI:**
   ```bash
   az staticwebapp create \
     --name your-app-name \
     --resource-group your-resource-group \
     --source dist/public
   ```

### Cloudflare Pages

1. **Connect Git Repository** in Cloudflare dashboard

2. **Configure Build Settings:**
   - Build command: `make build`
   - Build output directory: `dist/public`

Or use Wrangler CLI:

```bash
npx wrangler pages deploy dist/public
```

## SEO Optimization

### Pre-generated SEO Content

Each route includes unique SEO metadata:

- **Homepage**: General developer tools landing page
- **Tool Pages**: Specific metadata for each tool
  - Example: `/tools/json-formatter/` has "JSON Formatter - Format and Validate JSON"
  - Includes relevant keywords and descriptions

### Sitemap

The build includes `sitemap.xml` with all routes for search engine discovery.

### Robots.txt

Configured to allow all search engine crawlers.

### Social Sharing

Open Graph tags ensure proper previews when shared on:

- Twitter/X
- LinkedIn
- Facebook
- Slack
- Discord

## Performance Optimization

### Asset Caching

Configure your CDN/hosting to cache assets aggressively:

- **HTML files**: `Cache-Control: public, max-age=3600, must-revalidate`
- **JS/CSS files** (hashed): `Cache-Control: public, max-age=31536000, immutable`
- **Images** (hashed): `Cache-Control: public, max-age=31536000, immutable`

### Compression

Enable gzip or brotli compression:

- Main JS bundle: ~1.3MB → ~352KB gzipped
- CSS bundle: ~83KB → ~14KB gzipped

Most static hosting platforms enable this automatically.

### HTTP/2

Use hosting platforms that support HTTP/2 for:

- Parallel asset loading
- Header compression
- Server push (optional)

## Custom Domain

### DNS Configuration

Point your domain to your hosting platform:

**AWS CloudFront:**

- Create CNAME record: `www.yourdomain.com` → `d111111abcdef8.cloudfront.net`
- Create A record (Alias): `yourdomain.com` → CloudFront distribution

**Netlify:**

- Add custom domain in Netlify dashboard
- Update DNS to Netlify's nameservers or add CNAME

**Vercel:**

- Add domain in Vercel dashboard
- Update DNS with provided records

### SSL/TLS

Most platforms provide automatic HTTPS:

- **AWS**: Use AWS Certificate Manager (ACM)
- **Netlify/Vercel/Cloudflare**: Automatic Let's Encrypt certificates
- **GitHub Pages**: Automatic for custom domains

## Monitoring and Analytics

Since this is a privacy-focused application, consider:

- **Server-side analytics** (respects privacy)
- **Error tracking** (Sentry, LogRocket)
- **Performance monitoring** (CloudWatch, Vercel Analytics)

Avoid client-side tracking that compromises the offline-first, privacy-focused nature.

## Environment Variables

This application doesn't require environment variables in production as all processing is client-side.

If you need to customize:

- Update meta tags in `scripts/generate-static-routes.ts`
- Rebuild with `make build`

## Rollback Strategy

Keep previous builds for easy rollback:

```bash
# Tag builds
mv dist/public dist/public-$(date +%Y%m%d-%H%M%S)

# Rollback
aws s3 sync dist/public-20250104-153000/ s3://your-bucket-name --delete
```

## Testing Deployment

### Local Testing

Test the production build locally:

```bash
make build
npx serve dist/public
```

Visit `http://localhost:3000` to verify all routes work correctly.

### Verify SEO

Check that each tool page has unique metadata:

```bash
curl https://yourdomain.com/tools/json-formatter/ | grep "<title>"
curl https://yourdomain.com/tools/date-converter/ | grep "<meta name=\"description\""
```

## Troubleshooting

### Routes Return 404

Configure your hosting platform for SPA routing:

**AWS S3:**

- Set error document to `index.html`

**Netlify:**
Add `_redirects` file:

```
/*    /index.html   200
```

**Vercel:**
Add to `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Assets Not Loading

Ensure all paths are absolute (start with `/`):

- ✅ `/assets/index-abc123.js`
- ❌ `assets/index-abc123.js`

The build script already handles this correctly.

### CSP Errors

The Content Security Policy is strict for security. If you need to modify:

- Edit `client/index.html`
- Rebuild with `make build`

## Cost Estimation

**AWS S3 + CloudFront:**

- Storage: $0.023/GB (~$0.06/month for 2.6MB)
- Data transfer: $0.085/GB (first 10TB)
- Requests: $0.0004/1000 GET requests
- **Estimated**: $1-5/month for moderate traffic

**Netlify/Vercel:**

- Free tier: 100GB bandwidth/month
- **Estimated**: Free for most use cases

**GitHub Pages:**

- **Free** for public repositories

## Continuous Deployment

Set up automatic deployments on git push:

1. Add build script to your CI/CD pipeline
2. Deploy on successful build
3. Run smoke tests post-deployment

Example GitHub Actions workflow included in `.github/workflows/deploy.yml`

## Support

For deployment issues:

- Check hosting platform documentation
- Review build logs: `make build`
- Verify route structure: `ls -R dist/public/tools/`
