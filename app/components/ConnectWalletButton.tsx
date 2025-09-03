'use client';

import React from 'react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';
import { formatAddress } from '@/app/utils/formatting';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface ConnectWalletButtonProps {
  showBalance?: boolean;
  showDisconnect?: boolean;
  className?: string;
  label?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export function ConnectWalletButton({
  showBalance = true,
  showDisconnect = true,
  className,
  label = 'Connect Wallet',
  variant = 'default',
  size = 'default',
}: ConnectWalletButtonProps) {
  const { address, isConnected } = useAccount();
  
  return (
    <div className={className}>
      {isConnected && address ? (
        <Card variant="outline" padding="sm" className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-primary-600"
              >
                <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">{formatAddress({ address, length: 4 })}</p>
              {showBalance && (
                <p className="text-xs text-secondary-500">Balance: Loading...</p>
              )}
            </div>
          </div>
          {showDisconnect && (
            <Button
              variant="ghost"
              size="sm"
              className="text-secondary-500 hover:text-secondary-700"
            >
              Disconnect
            </Button>
          )}
        </Card>
      ) : (
        <ConnectWallet
          buttonClassName={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            variant === 'default'
              ? 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500'
              : variant === 'outline'
              ? 'border border-input bg-transparent hover:bg-secondary-100 hover:text-secondary-900 focus-visible:ring-secondary-300'
              : variant === 'secondary'
              ? 'bg-secondary-200 text-secondary-900 hover:bg-secondary-300 focus-visible:ring-secondary-300'
              : 'hover:bg-secondary-100 hover:text-secondary-900 focus-visible:ring-secondary-300'
          } ${
            size === 'default'
              ? 'h-10 py-2 px-4'
              : size === 'sm'
              ? 'h-9 px-3'
              : 'h-11 px-8'
          }`}
        />
      )}
    </div>
  );
}

