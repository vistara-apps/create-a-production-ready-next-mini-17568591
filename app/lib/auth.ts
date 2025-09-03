/**
 * Authentication utilities for the application
 */

import { useAccount } from 'wagmi';

/**
 * User object representing an authenticated user
 */
export interface User {
  address: string;
  isConnected: boolean;
  chainId?: number;
}

/**
 * Authentication state
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Creates an authentication state object based on wallet connection
 * 
 * @returns Authentication state
 */
export function createAuthState(): AuthState {
  const { address, isConnected, chainId } = useAccount();
  
  if (!address || !isConnected) {
    return {
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    };
  }
  
  return {
    isAuthenticated: true,
    user: {
      address,
      isConnected,
      chainId,
    },
    loading: false,
    error: null,
  };
}

/**
 * Checks if the user is authenticated
 * 
 * @param user - User object
 * @returns True if authenticated, false otherwise
 */
export function isAuthenticated(user: User | null): boolean {
  return !!user && user.isConnected;
}

/**
 * Checks if the user is on the correct chain
 * 
 * @param user - User object
 * @param requiredChainId - Required chain ID
 * @returns True if on the correct chain, false otherwise
 */
export function isOnCorrectChain(user: User | null, requiredChainId: number): boolean {
  return !!user && user.chainId === requiredChainId;
}

/**
 * Gets the authentication token for API requests
 * 
 * @returns Authentication token or null if not authenticated
 */
export function getAuthToken(): string | null {
  // In a real application, this would retrieve a token from localStorage or a cookie
  return localStorage.getItem('auth_token');
}

/**
 * Sets the authentication token for API requests
 * 
 * @param token - Authentication token
 */
export function setAuthToken(token: string): void {
  localStorage.setItem('auth_token', token);
}

/**
 * Clears the authentication token
 */
export function clearAuthToken(): void {
  localStorage.removeItem('auth_token');
}

