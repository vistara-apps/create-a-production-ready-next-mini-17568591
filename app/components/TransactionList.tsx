'use client';

import { useState } from 'react';
import { Transaction } from '../types';
import { formatAddress, formatDate, formatEth } from '../utils';

interface TransactionListProps {
  transactions?: Transaction[];
  isLoading?: boolean;
  error?: string;
}

export default function TransactionList({
  transactions = [],
  isLoading = false,
  error,
}: TransactionListProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'failed'>('all');
  
  // Filter transactions based on selected filter
  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    return tx.status === filter;
  });
  
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-lg">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="bg-red-900/20 border border-red-500 text-red-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Error Loading Transactions</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  if (transactions.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">No Transactions Found</h3>
          <p className="text-gray-400">Your transaction history will appear here.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Transactions</h2>
        <div className="flex space-x-2">
          {(['all', 'pending', 'confirmed', 'failed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded text-sm ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredTransactions.map((tx) => (
          <div key={tx.hash} className="bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-mono text-sm">{formatAddress(tx.hash, 10, 6)}</h3>
                <p className="text-sm text-gray-400">{formatDate(tx.timestamp)}</p>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  tx.status === 'confirmed'
                    ? 'bg-green-900/30 text-green-400'
                    : tx.status === 'pending'
                    ? 'bg-yellow-900/30 text-yellow-400'
                    : 'bg-red-900/30 text-red-400'
                }`}
              >
                {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-400">From</p>
                <p className="font-mono text-sm truncate">{formatAddress(tx.from)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">To</p>
                <p className="font-mono text-sm truncate">{formatAddress(tx.to)}</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-400">Value</span>
                <span className="font-medium">{formatEth(tx.value)} ETH</span>
              </div>
              {tx.gasUsed && (
                <div className="flex justify-between mt-1">
                  <span className="text-gray-400">Gas Used</span>
                  <span>{tx.gasUsed}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
