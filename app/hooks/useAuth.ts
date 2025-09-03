'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { errorReporter } from '@/app/lib/errorReporting';
import { logger } from '@/app/lib/logger';
import { User, AuthState } from '@/app/lib/auth';

/**
 * Hook for managing authentication state
 * 
 * @returns Authentication state and methods
 */
export function useAuth() {
  const { address, isConnected, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Create user object when connected
  const user: User | null = isConnected && address
    ? { address, isConnected, chainId }
    : null;
  
  // Authentication state
  const authState: AuthState = {
    isAuthenticated: !!user,
    user,
    loading,
    error,
  };
  
  // Handle login
  const login = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real application, this might perform additional authentication steps
      // beyond just connecting the wallet
      
      logger.info('User logged in', { address });
      
      setLoading(false);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      setLoading(false);
      errorReporter.report(error, 'medium', { address });
      throw error;
    }
  }, [address]);
  
  // Handle logout
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      
      // Disconnect wallet
      disconnect();
      
      // Clear any auth tokens or session data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
      
      logger.info('User logged out', { address });
      
      setLoading(false);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      setLoading(false);
      errorReporter.report(error, 'medium', { address });
    }
  }, [address, disconnect]);
  
  // Log authentication state changes
  useEffect(() => {
    if (isConnected && address) {
      logger.info('Wallet connected', { address, chainId });
    } else if (!isConnected && !loading) {
      logger.info('Wallet disconnected');
    }
  }, [isConnected, address, chainId, loading]);
  
  return {
    ...authState,
    login,
    logout,
  };
}

