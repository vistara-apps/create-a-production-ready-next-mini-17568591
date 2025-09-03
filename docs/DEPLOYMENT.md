# Deployment Guide

This document provides instructions for deploying the Base Mini App to various environments.

## Prerequisites

Before deploying, ensure you have:

1. Node.js 18.17.0 or later
2. npm, yarn, or pnpm
3. Access to the deployment platform (e.g., Vercel, Netlify)
4. Environment variables configured

## Environment Variables

The following environment variables are required for deployment:

| Variable | Description | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_ONCHAINKIT_API_KEY` | API key for OnchainKit services | Yes |
| `NEXT_PUBLIC_APP_URL` | Public URL of the application | Yes (in production) |
| `NEXT_PUBLIC_DEFAULT_CHAIN_ID` | Default chain ID (defaults to Base) | No |
| `NEXT_PUBLIC_ENABLE_TESTNET` | Enable testnet mode (true/false) | No |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Enable analytics (true/false) | No |
| `NEXT_PUBLIC_ENABLE_ERROR_REPORTING` | Enable error reporting (true/false) | No |
| `NEXT_PUBLIC_ANALYTICS_ID` | Analytics ID | No |
| `NEXT_PUBLIC_ERROR_REPORTING_DSN` | Error reporting DSN | No |

## Deployment Options

### Vercel (Recommended)

1. Create a new project on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Configure environment variables in the Vercel dashboard
4. Deploy the project

Vercel will automatically detect the Next.js configuration and deploy the application.

### Netlify

1. Create a new site on [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Configure environment variables in the Netlify dashboard
5. Deploy the site

### AWS Amplify

1. Create a new app on [AWS Amplify](https://aws.amazon.com/amplify/)
2. Connect your GitHub repository
3. Configure the build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
4. Configure environment variables in the Amplify dashboard
5. Deploy the app

### Docker

1. Build the Docker image:

```bash
docker build -t base-mini-app .
```

2. Run the Docker container:

```bash
docker run -p 3000:3000 -e NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key -e NEXT_PUBLIC_APP_URL=your_app_url base-mini-app
```

## Custom Server Deployment

If you're deploying to a custom server:

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm run start
```

3. Configure a reverse proxy (e.g., Nginx, Apache) to serve the application.

### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Continuous Integration/Continuous Deployment (CI/CD)

### GitHub Actions

Create a `.github/workflows/deploy.yml` file:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Post-Deployment Verification

After deploying, verify:

1. The application loads correctly
2. Wallet connection works
3. Farcaster frame integration works
4. Environment variables are correctly configured
5. No console errors or warnings

## Troubleshooting

### Common Issues

1. **Application fails to build**
   - Check Node.js version
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Environment variables not working**
   - Ensure they are correctly configured in the deployment platform
   - Verify they are prefixed with `NEXT_PUBLIC_` if used in the browser

3. **Farcaster frame not working**
   - Verify the `.well-known/farcaster.json` file is accessible
   - Check the frame configuration

4. **Wallet connection issues**
   - Verify OnchainKit API key is correct
   - Check browser console for errors

## Monitoring and Logging

For production deployments, consider setting up:

1. Error tracking (e.g., Sentry)
2. Performance monitoring (e.g., New Relic, Datadog)
3. Analytics (e.g., Google Analytics, Plausible)
4. Logging (e.g., Logtail, Papertrail)

## Security Considerations

1. Ensure all environment variables are securely stored
2. Configure Content Security Policy (CSP) headers
3. Enable HTTPS
4. Implement rate limiting for API endpoints
5. Regularly update dependencies

