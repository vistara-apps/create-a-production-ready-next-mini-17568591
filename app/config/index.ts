/**
 * Application configuration
 */

import { base, baseGoerli } from 'viem/chains';

/**
 * Environment variables with defaults
 */
export const env = {
  // API keys
  ONCHAINKIT_API_KEY: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || '',
  
  // Application URLs
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://miniappprodverify2-lby0-c3x8a5vkm-vistara.vercel.app',
  
  // Blockchain configuration
  DEFAULT_CHAIN_ID: parseInt(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID || '8453', 10),
  ENABLE_TESTNET: process.env.NEXT_PUBLIC_ENABLE_TESTNET === 'true',
  
  // Feature flags
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'false',
  ENABLE_ERROR_REPORTING: process.env.NEXT_PUBLIC_ERROR_REPORTING !== 'false',
  
  // Analytics configuration
  ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID || '',
  
  // Error reporting configuration
  ERROR_REPORTING_DSN: process.env.NEXT_PUBLIC_ERROR_REPORTING_DSN || '',
  
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
};

/**
 * Application metadata
 */
export const metadata = {
  name: 'Base Mini App',
  description: 'A production-ready Next.js Base mini app using OnchainKit MiniKit',
  version: '0.1.0',
};

/**
 * Blockchain configuration
 */
export const blockchain = {
  // Default chain
  defaultChain: env.ENABLE_TESTNET ? baseGoerli : base,
  
  // Supported chains
  supportedChains: env.ENABLE_TESTNET ? [baseGoerli] : [base],
  
  // RPC URLs
  rpcUrls: {
    [base.id]: base.rpcUrls.default.http[0],
    [baseGoerli.id]: baseGoerli.rpcUrls.default.http[0],
  },
  
  // Block explorer URLs
  blockExplorers: {
    [base.id]: base.blockExplorers.default.url,
    [baseGoerli.id]: baseGoerli.blockExplorers.default.url,
  },
};

/**
 * Feature flags
 */
export const features = {
  analytics: env.ENABLE_ANALYTICS,
  errorReporting: env.ENABLE_ERROR_REPORTING,
};

/**
 * Application configuration
 */
const config = {
  env,
  metadata,
  blockchain,
  features,
};

export default config;

