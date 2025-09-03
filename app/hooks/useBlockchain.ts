'use client';

import { useState, useCallback } from 'react';
import { useAccount, useBalance, useChainId, useWriteContract } from 'wagmi';
import { errorReporter } from '@/app/lib/errorReporting';
import { logger } from '@/app/lib/logger';
import { validateTransaction } from '@/app/utils/validation';
import { base } from 'viem/chains';

/**
 * Transaction parameters
 */
export interface SendTransactionParams {
  to: string;
  value: bigint;
  data?: string;
}

/**
 * Hook for blockchain interactions
 * 
 * @returns Blockchain state and methods
 */
export function useBlockchain() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balance } = useBalance({ address });
  const { writeContractAsync } = useWriteContract();
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  /**
   * Sends a transaction
   * 
   * @param params - Transaction parameters
   * @returns Transaction hash
   */
  const sendTransaction = useCallback(
    async (params: SendTransactionParams) => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Validate transaction parameters
        const validation = validateTransaction(params);
        if (validation !== true) {
          throw new Error(validation.error);
        }
        
        // Check if connected
        if (!isConnected || !address) {
          throw new Error('Wallet not connected');
        }
        
        // Check if on the correct chain
        if (chainId !== base.id) {
          throw new Error(`Wrong network. Please switch to ${base.name}`);
        }
        
        // Send transaction
        const hash = await writeContractAsync({
          abi: [],
          address: params.to as `0x${string}`,
          functionName: '',
          value: params.value,
          args: [],
        });
        
        logger.info('Transaction sent', {
          hash,
          from: address,
          to: params.to,
          value: params.value.toString(),
        });
        
        setIsLoading(false);
        
        return {
          hash,
          status: 'success' as const,
        };
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        setIsLoading(false);
        
        errorReporter.report(error, 'medium', {
          from: address,
          to: params.to,
          value: params.value.toString(),
        });
        
        throw error;
      }
    },
    [address, chainId, isConnected, writeContractAsync]
  );
  
  return {
    chainId,
    account: address,
    balance: balance?.value,
    isConnected,
    isLoading,
    error,
    sendTransaction,
  };
}

