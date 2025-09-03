'use client';

import { Providers } from './providers';
import './globals.css';
import { Metadata } from 'next';

// Import global CSS
import './globals.css';

// Define metadata for the application
export const metadata: Metadata = {
  title: 'Base Mini App',
  description: 'A production-ready Next.js Base mini app using OnchainKit MiniKit',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon-512x512.png',
    apple: '/apple-icon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Base Mini App',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://miniappprodverify2-lby0-c3x8a5vkm-vistara.vercel.app',
    siteName: 'Base Mini App',
    title: 'Base Mini App',
    description: 'A production-ready Next.js Base mini app using OnchainKit MiniKit',
    images: [
      {
        url: 'https://miniappprodverify2-lby0-c3x8a5vkm-vistara.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Base Mini App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base Mini App',
    description: 'A production-ready Next.js Base mini app using OnchainKit MiniKit',
    images: ['https://miniappprodverify2-lby0-c3x8a5vkm-vistara.vercel.app/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
