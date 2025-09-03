/**
 * User profile interface
 */
export interface UserProfile {
  /** Ethereum address of the user */
  address: string;
  /** Display name if available */
  displayName?: string;
  /** User's ENS name if available */
  ensName?: string;
  /** User's profile image URL */
  profileImageUrl?: string;
  /** User's Farcaster ID if connected */
  farcasterId?: string;
  /** Timestamp of when the user first connected */
  firstConnectedAt: number;
  /** Timestamp of the user's last activity */
  lastActiveAt: number;
}

/**
 * Transaction interface
 */
export interface Transaction {
  /** Transaction hash */
  hash: string;
  /** Transaction status */
  status: 'pending' | 'confirmed' | 'failed';
  /** Block number where transaction was included */
  blockNumber?: number;
  /** Timestamp of when the transaction was submitted */
  timestamp: number;
  /** From address */
  from: string;
  /** To address */
  to: string;
  /** Value in wei */
  value: string;
  /** Gas used */
  gasUsed?: string;
  /** Gas price in wei */
  gasPrice?: string;
}

/**
 * Mini app settings interface
 */
export interface MiniAppSettings {
  /** Theme preference */
  theme: 'light' | 'dark' | 'system';
  /** Notification preferences */
  notifications: {
    enabled: boolean;
    transactionUpdates: boolean;
    marketingUpdates: boolean;
  };
  /** Privacy settings */
  privacy: {
    shareAnalytics: boolean;
    shareWalletActivity: boolean;
  };
}

/**
 * API response interface
 */
export interface ApiResponse<T> {
  /** Success status */
  success: boolean;
  /** Response data */
  data?: T;
  /** Error message if any */
  error?: string;
  /** Error code if any */
  errorCode?: number;
}
