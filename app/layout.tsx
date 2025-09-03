'use client';

import { Providers } from './providers';
import './globals.css';
import config from './config';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{config.metadata.name}</title>
        <meta name="description" content={config.metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:title" content={config.metadata.name} />
        <meta property="og:description" content={config.metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={config.env.APP_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.metadata.name} />
        <meta name="twitter:description" content={config.metadata.description} />
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

