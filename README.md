# Base Mini App

A production-ready Next.js Base mini app using OnchainKit MiniKit.

## Features

- **Wallet Connection**: Connect your Ethereum wallet using OnchainKit
- **Farcaster Integration**: Full support for Farcaster Frames
- **Responsive Design**: Works on all device sizes
- **Type Safety**: Built with TypeScript for robust code
- **API Routes**: Backend API endpoints for user data and transactions
- **Modern UI**: Clean, modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 18, Tailwind CSS
- **Web3**: OnchainKit, Wagmi, Viem
- **State Management**: React Query (Tanstack Query)
- **Database**: Upstash Redis (for production)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/vistara-apps/create-a-production-ready-next-mini-17568591.git
cd create-a-production-ready-next-mini-17568591
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

Build the application for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Start the production server:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## Farcaster Frame Integration

This app includes full support for Farcaster Frames. The Frame configuration is located in `public/.well-known/farcaster.json`.

To use the app as a Frame:
1. Deploy the app to a public URL
2. Create a Farcaster cast with the app URL
3. Users can interact with the app directly within Farcaster

## API Documentation

The app includes a RESTful API for user data and transactions. See the [API Documentation](app/api/README.md) for details.

## Technical Specification

For detailed technical information, see the [Technical Specification](TECHNICAL_SPEC.md).

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   ├── components/       # React components
│   ├── utils/            # Utility functions
│   ├── types.ts          # TypeScript type definitions
│   ├── globals.css       # Global CSS
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Home page component
│   └── providers.tsx     # Provider components
├── public/               # Static files
│   ├── .well-known/      # Farcaster configuration
│   └── manifest.json     # Web app manifest
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
