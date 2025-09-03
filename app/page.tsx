'use client';

import { useEffect } from 'react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { useMiniKit } from '@coinbase/onchainkit/minikit';

export default function Home() {
  const { setFrameReady } = useMiniKit();

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-4">Base Mini App</h1>
      <ConnectWallet />
    </main>
  );
}
