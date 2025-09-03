# Base Mini App

A production-ready Next.js Base mini app using OnchainKit MiniKit.

## Features

- ✅ Next.js 15.3.3 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ OnchainKit for blockchain integration
- ✅ MiniKit for Farcaster frame integration
- ✅ Wagmi for blockchain interactions
- ✅ React Query for data fetching
- ✅ Error handling and reporting
- ✅ Responsive design
- ✅ Accessibility features
- ✅ Performance optimizations
- ✅ Production-ready configuration

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm, yarn, or pnpm

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
yarn
# or
pnpm install
```

3. Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local` with your own values.

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build

Build the application for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Start

Start the production server:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## Project Structure

```
├── app/
│   ├── components/       # UI components
│   │   ├── ui/           # Base UI components
│   │   └── __tests__/    # Component tests
│   ├── config/           # Configuration files
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Core libraries and utilities
│   │   └── __tests__/    # Library tests
│   ├── styles/           # Global styles and theme
│   ├── utils/            # Utility functions
│   │   └── __tests__/    # Utility tests
│   ├── globals.css       # Global CSS
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Main page component
│   └── providers.tsx     # Context providers
├── docs/                 # Documentation
├── public/               # Static assets
│   └── .well-known/      # Well-known files
├── scripts/              # Build and utility scripts
├── .env.example          # Example environment variables
├── next.config.mjs       # Next.js configuration
├── package.json          # Dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Environment Variables

| Variable | Description | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_ONCHAINKIT_API_KEY` | API key for OnchainKit services | Yes |
| `NEXT_PUBLIC_APP_URL` | Public URL of the application | Yes (in production) |
| `NEXT_PUBLIC_DEFAULT_CHAIN_ID` | Default chain ID (defaults to Base) | No |
| `NEXT_PUBLIC_ENABLE_TESTNET` | Enable testnet mode (true/false) | No |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Enable analytics (true/false) | No |
| `NEXT_PUBLIC_ENABLE_ERROR_REPORTING` | Enable error reporting (true/false) | No |
| `NEXT_PUBLIC_ANALYTICS_ID` | Analytics ID | No |
| `NEXT_PUBLIC_ERROR_REPORTING_DSN` | Error reporting DSN | No |

## Documentation

For more detailed documentation, see the [docs](./docs) directory:

- [Technical Specifications](./docs/TECHNICAL_SPECS.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [API Documentation](./docs/API.md)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

