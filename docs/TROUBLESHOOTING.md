# Troubleshooting Guide

This guide provides solutions for common issues you might encounter when using or developing the Base Mini App.

## User Issues

### Wallet Connection Issues

#### Problem: Wallet not connecting

**Possible causes:**
- Wallet extension not installed
- Wallet locked
- Browser permissions blocked
- Network connectivity issues

**Solutions:**
1. Ensure your wallet extension (MetaMask, Coinbase Wallet, etc.) is installed
2. Unlock your wallet
3. Check browser permissions for the wallet extension
4. Refresh the page and try again
5. Check your internet connection

#### Problem: Wrong network error

**Possible causes:**
- Connected to a network other than Base

**Solutions:**
1. Open your wallet extension
2. Switch to the Base network
3. If Base is not in your networks list, add it with the following details:
   - Network Name: Base
   - RPC URL: https://mainnet.base.org
   - Chain ID: 8453
   - Currency Symbol: ETH
   - Block Explorer URL: https://basescan.org

### Frame Issues

#### Problem: Frame not loading or not responding

**Possible causes:**
- JavaScript disabled
- Browser compatibility issues
- Network connectivity problems
- Frame initialization failure

**Solutions:**
1. Ensure JavaScript is enabled in your browser
2. Try a different browser (Chrome, Firefox, Safari)
3. Check your internet connection
4. Clear browser cache and cookies
5. Refresh the page

#### Problem: Frame actions not working

**Possible causes:**
- Wallet not connected
- Frame state issues
- Network connectivity problems

**Solutions:**
1. Connect your wallet first
2. Refresh the page to reset the frame state
3. Check your internet connection
4. Try a different browser

### Transaction Issues

#### Problem: Transaction failing

**Possible causes:**
- Insufficient funds for gas
- Invalid transaction parameters
- Network congestion
- Smart contract errors

**Solutions:**
1. Ensure you have sufficient ETH for gas fees
2. Check transaction parameters (recipient address, amount, etc.)
3. Try increasing the gas price
4. Wait for network congestion to decrease
5. Check for error messages in the console

#### Problem: Transaction pending for too long

**Possible causes:**
- Low gas price
- Network congestion
- Nonce issues

**Solutions:**
1. Increase gas price in your wallet
2. Wait for network conditions to improve
3. Check for pending transactions with the same nonce
4. Consider canceling and resubmitting the transaction

## Developer Issues

### Build and Development Issues

#### Problem: Build failing

**Possible causes:**
- Missing dependencies
- TypeScript errors
- Configuration issues
- Node.js version mismatch

**Solutions:**
1. Run `npm install` to ensure all dependencies are installed
2. Check for TypeScript errors with `npm run typecheck`
3. Verify your Node.js version (should be 18.17.0 or later)
4. Check the build logs for specific errors
5. Ensure all required environment variables are set

#### Problem: Development server not starting

**Possible causes:**
- Port conflicts
- Missing dependencies
- Environment configuration issues

**Solutions:**
1. Check if another process is using port 3000
2. Run `npm install` to ensure all dependencies are installed
3. Verify your `.env.local` file has the required variables
4. Check the console for specific error messages

### Environment Variable Issues

#### Problem: Environment variables not working

**Possible causes:**
- Variables not properly set
- Missing `NEXT_PUBLIC_` prefix for client-side variables
- Environment file not loaded

**Solutions:**
1. Ensure variables are correctly set in `.env.local`
2. Add `NEXT_PUBLIC_` prefix to variables used in the browser
3. Restart the development server after changing environment variables
4. Check for typos in variable names

### OnchainKit and MiniKit Issues

#### Problem: OnchainKit not initializing

**Possible causes:**
- Missing or invalid API key
- Network connectivity issues
- Incompatible package versions

**Solutions:**
1. Verify your OnchainKit API key is correctly set
2. Check your internet connection
3. Ensure you're using compatible versions of OnchainKit and related packages
4. Check the console for specific error messages

#### Problem: MiniKit frame not working

**Possible causes:**
- Frame configuration issues
- Missing or incorrect farcaster.json
- Initialization errors

**Solutions:**
1. Verify the `.well-known/farcaster.json` file is correctly configured
2. Ensure the `setFrameReady` function is called
3. Check the console for specific error messages
4. Verify the frame URL is accessible

### Deployment Issues

#### Problem: Deployment failing

**Possible causes:**
- Build errors
- Missing environment variables
- Platform-specific configuration issues

**Solutions:**
1. Ensure the build succeeds locally
2. Configure all required environment variables in the deployment platform
3. Check deployment logs for specific errors
4. Verify platform-specific configurations (e.g., Vercel, Netlify)

#### Problem: Application not working after deployment

**Possible causes:**
- Environment variables not set
- API endpoints not accessible
- CORS issues
- Build configuration problems

**Solutions:**
1. Verify all environment variables are correctly set in the deployment platform
2. Check if API endpoints are accessible from the deployed application
3. Configure CORS headers if necessary
4. Check browser console for specific errors
5. Verify the build output in the deployment logs

## Performance Issues

### Problem: Slow page loading

**Possible causes:**
- Large bundle size
- Unoptimized images
- Too many network requests
- Server-side rendering issues

**Solutions:**
1. Analyze bundle size with tools like `next/bundle-analyzer`
2. Optimize images and use proper formats (WebP, AVIF)
3. Implement code splitting and lazy loading
4. Use caching strategies for API requests
5. Optimize server-side rendering

### Problem: High memory usage

**Possible causes:**
- Memory leaks
- Inefficient data structures
- Excessive re-renders

**Solutions:**
1. Use React DevTools to identify unnecessary re-renders
2. Implement memoization with `useMemo` and `useCallback`
3. Optimize state management
4. Clean up event listeners and subscriptions in `useEffect` cleanup functions

## Reporting Issues

If you encounter an issue not covered in this guide:

1. Check the [GitHub repository](https://github.com/vistara-apps/create-a-production-ready-next-mini-17568591) for existing issues
2. Open a new issue with the following information:
   - Detailed description of the problem
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Browser and wallet information
   - Screenshots or error messages
   - Environment details (local development, production, etc.)

