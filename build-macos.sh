#!/bin/bash

# Liberchat macOS compilation script with DMG
# Usage: ./build-macos.sh

set -e

echo " Compiling Liberchat macOS v2.0.0"
echo "======================================"

# Check if we are on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ This script must be run on macOS"
    exit 1
fi

# Clean previous builds
echo " Cleaning previous builds..."
rm -rf liberchat-darwin-x64/
rm -rf dist/
rm -f *.dmg

# Install dependencies
echo " Installing dependencies..."
npm install

# Compile application
echo " Compiling the application..."
npm run package-mac

# Verify app was created
if [ ! -d "liberchat-darwin-x64/liberchat.app" ]; then
    echo "❌ Error: The application was not created"
    exit 1
fi

echo " Application compiled successfully"

# Install create-dmg if necessary
if ! command -v create-dmg &> /dev/null; then
    echo " Installing create-dmg..."
    brew install create-dmg
fi

# Create DMG
echo "💿 Creating DMG file..."
create-dmg \
  --volname "Liberchat" \
  --volicon "assets/icons/liberchat.icns" \
  --window-pos 200 120 \
  --window-size 600 300 \
  --icon-size 100 \
  --icon "liberchat.app" 175 120 \
  --hide-extension "liberchat.app" \
  --app-drop-link 425 120 \
  "liberchat-macos-v2.0.0.dmg" \
  "liberchat-darwin-x64/"

echo ""
echo " Compilation completed successfully!"
echo " Generated files:"
echo "   • liberchat-darwin-x64/liberchat.app"
echo "   • liberchat-macos-v2.0.0.dmg"
echo ""
echo " Installation:"
echo "   1. Double-click on liberchat-macos-v2.0.0.dmg"
echo "   2. Drag Liberchat to Applications"
echo ""