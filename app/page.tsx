'use client';

import { useEffect } from 'react';
import { ConnectWalletButton } from '@/app/components/ConnectWalletButton';
import { Frame } from '@/app/components/Frame';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { useFrame } from '@/app/hooks/useFrame';
import { useAuth } from '@/app/hooks/useAuth';
import { useBlockchain } from '@/app/hooks/useBlockchain';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';
import config from '@/app/config';

export default function Home() {
  const { frameState, nextStep, prevStep, isFrameReady } = useFrame();
  const { isAuthenticated, user } = useAuth();
  const { chainId } = useBlockchain();

  // Check if user is on the correct chain
  const isCorrectChain = chainId === config.blockchain.defaultChain.id;

  return (
    <ErrorBoundary>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">{config.metadata.name}</h1>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              {config.metadata.description}
            </p>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-6">
              {/* Wallet connection */}
              <Card>
                <CardHeader>
                  <CardTitle>Connect Wallet</CardTitle>
                  <CardDescription>
                    Connect your wallet to interact with the application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ConnectWalletButton 
                    showBalance={true}
                    showDisconnect={true}
                    className="w-full"
                  />
                </CardContent>
                {isAuthenticated && !isCorrectChain && (
                  <CardFooter className="bg-warning/10 border-t border-warning/20">
                    <p className="text-sm text-warning">
                      Please switch to {config.blockchain.defaultChain.name} network
                    </p>
                  </CardFooter>
                )}
              </Card>

              {/* User info */}
              {isAuthenticated && user && (
                <Card>
                  <CardHeader>
                    <CardTitle>User Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Address:</span>
                        <span className="font-mono text-sm">{user.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Chain:</span>
                        <span>
                          {isCorrectChain 
                            ? config.blockchain.defaultChain.name 
                            : `Unknown (${chainId})`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Status:</span>
                        <span className="flex items-center">
                          <span className={`h-2 w-2 rounded-full mr-2 ${isCorrectChain ? 'bg-success' : 'bg-warning'}`}></span>
                          {isCorrectChain ? 'Connected' : 'Wrong Network'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Frame */}
              <Frame title="Farcaster Frame">
                <div className="space-y-4">
                  <div className="text-center p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      Step {frameState.step} of 3
                    </h3>
                    <p className="text-secondary-600">
                      {frameState.step === 1 && "Welcome to the Base Mini App!"}
                      {frameState.step === 2 && "Connect your wallet to continue."}
                      {frameState.step === 3 && "You're all set! Explore the app."}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={frameState.step === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={nextStep}
                      disabled={frameState.step === 3}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </Frame>

              {/* App info */}
              <Card>
                <CardHeader>
                  <CardTitle>About This App</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-secondary-600 mb-4">
                    This is a production-ready Next.js Base mini app using OnchainKit and MiniKit.
                    It demonstrates how to build a decentralized application with Farcaster frame integration.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Version:</span>
                      <span>{config.metadata.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Environment:</span>
                      <span className="capitalize">{config.env.NODE_ENV}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Frame Ready:</span>
                      <span className="flex items-center">
                        <span className={`h-2 w-2 rounded-full mr-2 ${isFrameReady ? 'bg-success' : 'bg-error'}`}></span>
                        {isFrameReady ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open('https://github.com/vistara-apps/create-a-production-ready-next-mini-17568591', '_blank')}
                  >
                    View on GitHub
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
}

