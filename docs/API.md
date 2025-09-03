# API Documentation for miniapp-prod-verify-2

## Overview
This document provides comprehensive documentation for all APIs, hooks, and interfaces used in the miniapp-prod-verify-2 application. It covers both internal APIs and external integrations with OnchainKit and MiniKit.

## OnchainKit Integration

### OnchainKitProvider
The `OnchainKitProvider` is a context provider that enables blockchain functionality throughout the application.

#### Props
```typescript
interface OnchainKitProviderProps {
  apiKey?: string;
  chain: Chain;
  config?: {
    appearance?: {
      mode?: 'light' | 'dark';
      theme?: 'default' | 'rounded' | 'minimal';
      name?: string;
    };
  };
  children: ReactNode;
}
```

#### Usage
```tsx
<OnchainKitProvider
  apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
  chain={base}
  config={{
    appearance: {
      mode: 'dark',
      theme: 'default',
      name: 'My Base Mini App',
    },
  }}
>
  {children}
</OnchainKitProvider>
```

### ConnectWallet
The `ConnectWallet` component provides a button for users to connect their wallet.

#### Props
```typescript
interface ConnectWalletProps {
  className?: string;
  label?: string;
  showBalance?: boolean;
}
```

#### Usage
```tsx
<ConnectWallet 
  className="custom-button-class" 
  label="Connect Wallet"
  showBalance={true}
/>
```

## MiniKit Integration

### MiniKitProvider
The `MiniKitProvider` is a context provider that enables Farcaster frame functionality.

#### Props
```typescript
interface MiniKitProviderProps {
  children: ReactNode;
}
```

#### Usage
```tsx
<MiniKitProvider>
  {children}
</MiniKitProvider>
```

### useMiniKit Hook
The `useMiniKit` hook provides access to MiniKit functionality.

#### Returns
```typescript
interface UseMiniKitReturn {
  setFrameReady: () => void;
  isFrameReady: boolean;
  frameState: FrameState;
  setFrameState: (state: FrameState) => void;
}
```

#### Usage
```tsx
const { setFrameReady, isFrameReady, frameState, setFrameState } = useMiniKit();

// Signal that the frame is ready
useEffect(() => {
  setFrameReady();
}, [setFrameReady]);
```

## Custom Hooks

### useAuth
The `useAuth` hook manages authentication state and provides authentication utilities.

#### Returns
```typescript
interface UseAuthReturn {
  isAuthenticated: boolean;
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: Error | null;
}
```

#### Usage
```tsx
const { isAuthenticated, user, login, logout, loading, error } = useAuth();

// Handle login
const handleLogin = async () => {
  try {
    await login();
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### useBlockchain
The `useBlockchain` hook provides blockchain utilities and state.

#### Returns
```typescript
interface UseBlockchainReturn {
  chainId: number;
  account: string | null;
  balance: bigint | null;
  sendTransaction: (params: SendTransactionParams) => Promise<TransactionReceipt>;
  isConnected: boolean;
  isConnecting: boolean;
  error: Error | null;
}
```

#### Usage
```tsx
const { chainId, account, balance, sendTransaction, isConnected } = useBlockchain();

// Send a transaction
const handleSend = async () => {
  try {
    const receipt = await sendTransaction({
      to: '0x...',
      value: parseEther('0.01'),
    });
    console.log('Transaction sent:', receipt);
  } catch (error) {
    console.error('Transaction failed:', error);
  }
};
```

### useFrame
The `useFrame` hook provides Farcaster frame utilities and state.

#### Returns
```typescript
interface UseFrameReturn {
  frameState: FrameState;
  setFrameState: (state: FrameState) => void;
  navigateToFrame: (frameUrl: string) => void;
  isFrameReady: boolean;
}
```

#### Usage
```tsx
const { frameState, setFrameState, navigateToFrame, isFrameReady } = useFrame();

// Update frame state
const updateState = (newState: Partial<FrameState>) => {
  setFrameState({ ...frameState, ...newState });
};
```

## Utility Functions

### validateTransaction
Validates transaction parameters before sending.

#### Parameters
```typescript
interface ValidateTransactionParams {
  to: string;
  value: bigint;
  data?: string;
}
```

#### Returns
```typescript
boolean | { valid: false; error: string }
```

#### Usage
```typescript
import { validateTransaction } from '../utils/validation';

const isValid = validateTransaction({
  to: '0x...',
  value: parseEther('0.01'),
});

if (isValid !== true) {
  console.error('Invalid transaction:', isValid.error);
  return;
}
```

### formatAddress
Formats an Ethereum address for display.

#### Parameters
```typescript
interface FormatAddressParams {
  address: string;
  length?: number;
}
```

#### Returns
```typescript
string
```

#### Usage
```typescript
import { formatAddress } from '../utils/formatting';

const displayAddress = formatAddress({
  address: '0x1234567890abcdef1234567890abcdef12345678',
  length: 4,
});
// Returns: 0x1234...5678
```

## Environment Variables

### Required Variables
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: API key for OnchainKit services

### Optional Variables
- `NEXT_PUBLIC_APP_URL`: Public URL of the application
- `NEXT_PUBLIC_DEFAULT_CHAIN_ID`: Default chain ID (defaults to Base)
- `NEXT_PUBLIC_ENABLE_TESTNET`: Enable testnet mode (true/false)

## Error Handling

### Error Codes
- `AUTH_ERROR`: Authentication-related errors
- `BLOCKCHAIN_ERROR`: Blockchain interaction errors
- `FRAME_ERROR`: Farcaster frame errors
- `VALIDATION_ERROR`: Input validation errors

### Error Response Format
```typescript
interface ErrorResponse {
  code: string;
  message: string;
  details?: unknown;
}
```

## Farcaster Frame Configuration

### farcaster.json
The `.well-known/farcaster.json` file configures the Farcaster frame integration.

```json
{
  "api": "v1"
}
```

### manifest.json
The `manifest.json` file configures the web application.

```json
{
  "name": "Base Mini App",
  "short_name": "Mini App",
  "start_url": "https://miniappprodverify2-lby0-c3x8a5vkm-vistara.vercel.app",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "orientation": "portrait-primary"
}
```

