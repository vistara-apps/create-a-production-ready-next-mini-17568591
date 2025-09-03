#!/bin/bash

# Setup script for Base Mini App
# This script sets up the development environment for the Base Mini App

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print header
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}   Base Mini App Setup Script           ${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""

# Check Node.js version
echo -e "${YELLOW}Checking Node.js version...${NC}"
NODE_VERSION=$(node -v)
NODE_VERSION_MAJOR=$(echo $NODE_VERSION | cut -d. -f1 | sed 's/v//')

if [ $NODE_VERSION_MAJOR -lt 18 ]; then
  echo -e "${RED}Error: Node.js version 18.17.0 or later is required.${NC}"
  echo -e "${RED}Current version: $NODE_VERSION${NC}"
  echo -e "${YELLOW}Please update Node.js and try again.${NC}"
  exit 1
fi

echo -e "${GREEN}Node.js version $NODE_VERSION is compatible.${NC}"
echo ""

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install
echo -e "${GREEN}Dependencies installed successfully.${NC}"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
  echo -e "${YELLOW}Creating .env.local file...${NC}"
  cp .env.example .env.local
  echo -e "${GREEN}.env.local file created.${NC}"
  echo -e "${YELLOW}Please update the environment variables in .env.local with your own values.${NC}"
else
  echo -e "${YELLOW}.env.local file already exists. Skipping...${NC}"
fi
echo ""

# Create public/icons directory if it doesn't exist
if [ ! -d public/icons ]; then
  echo -e "${YELLOW}Creating public/icons directory...${NC}"
  mkdir -p public/icons
  echo -e "${GREEN}public/icons directory created.${NC}"
  echo -e "${YELLOW}Please add icon files (icon-192x192.png and icon-512x512.png) to the public/icons directory.${NC}"
else
  echo -e "${YELLOW}public/icons directory already exists. Skipping...${NC}"
fi
echo ""

# Check if git hooks are set up
if [ ! -f .git/hooks/pre-commit ]; then
  echo -e "${YELLOW}Setting up git hooks...${NC}"
  
  # Create pre-commit hook
  cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash

# Pre-commit hook for Base Mini App
# This hook runs linting and type checking before committing

echo "Running pre-commit hook..."

# Run linting
echo "Running linting..."
npm run lint

# Check exit code
if [ $? -ne 0 ]; then
  echo "Linting failed. Please fix the errors before committing."
  exit 1
fi

# Run type checking
echo "Running type checking..."
npx tsc --noEmit

# Check exit code
if [ $? -ne 0 ]; then
  echo "Type checking failed. Please fix the errors before committing."
  exit 1
fi

echo "Pre-commit hook passed."
exit 0
EOF

  # Make the hook executable
  chmod +x .git/hooks/pre-commit
  
  echo -e "${GREEN}Git hooks set up successfully.${NC}"
else
  echo -e "${YELLOW}Git hooks already set up. Skipping...${NC}"
fi
echo ""

# Final message
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}   Setup completed successfully!         ${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Update the environment variables in .env.local with your own values."
echo -e "2. Add icon files to the public/icons directory."
echo -e "3. Run the development server with: ${GREEN}npm run dev${NC}"
echo -e "4. Open http://localhost:3000 in your browser to see the application."
echo ""
echo -e "${GREEN}Happy coding!${NC}"

