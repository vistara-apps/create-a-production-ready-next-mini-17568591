'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { createConfig, http } from 'viem';
import { type ReactNode, useState, useEffect } from 'react';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';
import config from '@/app/config';

// Create Wagmi client configuration
const wagmiConfig = createConfig({
  chains: config.blockchain.supportedChains,
  transports: {
    [config.blockchain.defaultChain.id]: http(),
  },
});

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 3,
        refetchOnWindowFocus: !config.env.IS_DEVELOPMENT,
      },
    },
  }));

  // Initialize error reporting and analytics
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize analytics if enabled
      if (config.features.analytics && config.env.ANALYTICS_ID) {
        console.log('Analytics initialized');
      }
      
      // Initialize error reporting if enabled
      if (config.features.errorReporting && config.env.ERROR_REPORTING_DSN) {
        console.log('Error reporting initialized');
      }
    }
  }, []);

  return (
    <ErrorBoundary>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <OnchainKitProvider
            apiKey={config.env.ONCHAINKIT_API_KEY}
            chain={config.blockchain.defaultChain}
            config={{
              appearance: {
                mode: 'dark',
                theme: 'default',
                name: config.metadata.name,
              },
            }}
          >
            <MiniKitProvider>
              {props.children}
            </MiniKitProvider>
          </OnchainKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  );
}

