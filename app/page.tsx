'use client';

import { useEffect, useState } from 'react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useAccount } from 'wagmi';

export default function Home() {
  const { setFrameReady } = useMiniKit();
  const { address, isConnected } = useAccount();
  const [userInteracted, setUserInteracted] = useState(false);

  // Set frame ready when component mounts
  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  // Track user interactions
  useEffect(() => {
    if (isConnected && address) {
      setUserInteracted(true);
      // You could log this interaction to your analytics service
      console.log('User connected with address:', address);
    }
  }, [isConnected, address]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="w-full max-w-5xl flex justify-end p-4">
        <ConnectWallet />
      </div>
      
      <div className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Base Mini App
        </h1>
        
        <p className="text-lg mb-8 max-w-2xl">
          A production-ready Next.js Base mini app using OnchainKit MiniKit. Connect your wallet to get started.
        </p>
        
        {isConnected ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Connected Account</h2>
            <p className="font-mono bg-gray-700 p-2 rounded overflow-hidden text-ellipsis">
              {address}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button 
                onClick={() => alert('Feature coming soon!')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                View Profile
              </button>
              <button 
                onClick={() => alert('Feature coming soon!')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                View Transactions
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Get Started</h2>
            <p className="mb-6">Connect your wallet to access all features of this mini app.</p>
            <ConnectWallet />
          </div>
        )}
      </div>
      
      <footer className="w-full max-w-5xl mt-12 border-t border-gray-700 p-4 text-center text-sm text-gray-400">
        <p>© 2025 Base Mini App. All rights reserved.</p>
        <p className="mt-2">Built with OnchainKit MiniKit</p>
      </footer>
    </main>
  );
}
