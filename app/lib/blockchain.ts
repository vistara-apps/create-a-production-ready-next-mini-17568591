/**
 * Blockchain utilities for the application
 */

import { parseEther, formatEther } from 'viem';
import { base } from 'viem/chains';

/**
 * Transaction parameters
 */
export interface TransactionParams {
  to: string;
  value: bigint;
  data?: string;
}

/**
 * Transaction receipt
 */
export interface TransactionReceipt {
  hash: string;
  blockNumber: number;
  status: 'success' | 'failure' | 'pending';
}

/**
 * Chain configuration
 */
export interface ChainConfig {
  id: number;
  name: string;
  network: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: {
    default: {
      http: string[];
    };
    public: {
      http: string[];
    };
  };
  blockExplorers: {
    default: {
      name: string;
      url: string;
    };
  };
}

/**
 * Default chain configuration (Base)
 */
export const DEFAULT_CHAIN: ChainConfig = base;

/**
 * Gets the block explorer URL for a transaction
 * 
 * @param txHash - Transaction hash
 * @param chainId - Chain ID (defaults to Base)
 * @returns Block explorer URL
 */
export function getExplorerUrl(txHash: string, chainId: number = DEFAULT_CHAIN.id): string {
  const chain = chainId === DEFAULT_CHAIN.id ? DEFAULT_CHAIN : base;
  return `${chain.blockExplorers.default.url}/tx/${txHash}`;
}

/**
 * Gets the block explorer URL for an address
 * 
 * @param address - Ethereum address
 * @param chainId - Chain ID (defaults to Base)
 * @returns Block explorer URL
 */
export function getAddressExplorerUrl(address: string, chainId: number = DEFAULT_CHAIN.id): string {
  const chain = chainId === DEFAULT_CHAIN.id ? DEFAULT_CHAIN : base;
  return `${chain.blockExplorers.default.url}/address/${address}`;
}

/**
 * Converts ETH to Wei
 * 
 * @param eth - Amount in ETH
 * @returns Amount in Wei (bigint)
 */
export function toWei(eth: string | number): bigint {
  return parseEther(eth.toString());
}

/**
 * Converts Wei to ETH
 * 
 * @param wei - Amount in Wei
 * @returns Amount in ETH (string)
 */
export function toEth(wei: bigint): string {
  return formatEther(wei);
}

/**
 * Estimates gas for a transaction
 * 
 * @param params - Transaction parameters
 * @returns Estimated gas (bigint)
 */
export async function estimateGas(params: TransactionParams): Promise<bigint> {
  // In a real application, this would use viem to estimate gas
  // This is a placeholder implementation
  return BigInt(21000);
}

/**
 * Gets the current gas price
 * 
 * @returns Gas price in Wei (bigint)
 */
export async function getGasPrice(): Promise<bigint> {
  // In a real application, this would use viem to get the current gas price
  // This is a placeholder implementation
  return BigInt(1000000000); // 1 gwei
}

/**
 * Checks if an address has a minimum balance
 * 
 * @param address - Ethereum address
 * @param minBalance - Minimum balance in ETH
 * @returns True if the address has at least the minimum balance, false otherwise
 */
export async function hasMinimumBalance(address: string, minBalance: string | number): Promise<boolean> {
  // In a real application, this would use viem to get the balance
  // This is a placeholder implementation
  return true;
}

