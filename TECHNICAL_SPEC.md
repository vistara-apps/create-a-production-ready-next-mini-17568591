# Technical Specification: Base Mini App

## Overview

This document outlines the technical specifications for the Base Mini App, a production-ready Next.js application that integrates with OnchainKit MiniKit for Farcaster Frame support.

## Architecture

### Frontend

- **Framework**: Next.js 15.3.3
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **State Management**: React Query (Tanstack Query)
- **Web3 Integration**: 
  - OnchainKit for wallet connection and Farcaster integration
  - Wagmi for Ethereum interactions
  - Viem for blockchain communication

### Backend

- **API Routes**: Next.js API routes
- **Database**: Upstash Redis for caching and session management
- **Authentication**: JWT-based authentication with wallet signatures

## Components

### Core Components

1. **Providers**
   - OnchainKitProvider: Provides wallet connection and Farcaster integration
   - MiniKitProvider: Provides Farcaster Frame functionality
   - WagmiProvider: Provides Ethereum interaction capabilities
   - QueryClientProvider: Provides data fetching and caching capabilities

2. **ConnectWallet**
   - Handles wallet connection and authentication
   - Supports multiple wallet providers
   - Manages connection state

3. **Frame Integration**
   - Uses `useMiniKit` hook for Frame integration
   - Calls `setFrameReady` to signal Frame readiness
   - Supports Frame actions and responses

### Data Models

1. **UserProfile**
   - User's Ethereum address
   - Display name
   - ENS name
   - Profile image URL
   - Farcaster ID
   - Connection timestamps

2. **Transaction**
   - Transaction hash
   - Status (pending, confirmed, failed)
   - Block information
   - From/to addresses
   - Value and gas information

3. **MiniAppSettings**
   - Theme preferences
   - Notification settings
   - Privacy settings

## API Endpoints

### User Profile

- `GET /api/user/profile`: Get user profile
- `PUT /api/user/profile`: Update user profile

### Transactions

- `GET /api/transactions`: Get user transactions
- `GET /api/transactions/:hash`: Get transaction details

### Settings

- `GET /api/user/settings`: Get user settings
- `PUT /api/user/settings`: Update user settings

## Authentication Flow

1. User connects wallet using ConnectWallet component
2. App requests signature from user's wallet
3. Signature is verified on the backend
4. JWT token is generated and returned to the client
5. Token is stored in local storage and included in subsequent API requests
6. Token is verified on each API request to authenticate the user

## Farcaster Integration

### Frame Support

- Farcaster Frame metadata is defined in `public/.well-known/farcaster.json`
- Frame is initialized using `useMiniKit().setFrameReady()`
- Frame actions are handled through OnchainKit's MiniKit

### Permissions

The app requests the following Farcaster permissions:
- `farcaster:identity`: Access to user's Farcaster identity
- `farcaster:publishCast`: Ability to publish casts on behalf of the user
- `farcaster:frame`: Ability to interact with Farcaster Frames

## Performance Optimizations

1. **Static Generation**
   - Home page is statically generated for fast initial load
   - Dynamic content is loaded client-side

2. **Code Splitting**
   - Components are code-split for optimal loading
   - Only necessary code is loaded for each page

3. **Caching**
   - API responses are cached using React Query
   - Static assets are cached with appropriate headers

4. **Image Optimization**
   - Next.js Image component is used for image optimization
   - Images are served in modern formats (WebP, AVIF)

## Security Considerations

1. **Authentication**
   - JWT tokens with appropriate expiration
   - Signature verification for wallet authentication
   - CSRF protection

2. **API Security**
   - Input validation on all endpoints
   - Rate limiting to prevent abuse
   - Error handling that doesn't expose sensitive information

3. **Frontend Security**
   - Content Security Policy (CSP)
   - XSS protection
   - HTTPS enforcement

## Deployment

The application is deployed on Vercel with the following configuration:
- Production URL: https://miniappprodverify2-lby0-c3x8a5vkm-vistara.vercel.app
- Environment variables are managed through Vercel's environment variable system
- Continuous deployment from the main branch

## Testing

1. **Unit Tests**
   - Component tests using React Testing Library
   - Utility function tests

2. **Integration Tests**
   - API endpoint tests
   - Authentication flow tests

3. **End-to-End Tests**
   - User flow tests using Cypress
   - Wallet connection tests

## Future Enhancements

1. **Analytics Integration**
   - User behavior tracking
   - Performance monitoring

2. **Localization**
   - Multi-language support
   - Region-specific formatting

3. **Advanced Features**
   - Transaction history visualization
   - ENS integration for profile management
   - Social features leveraging Farcaster
