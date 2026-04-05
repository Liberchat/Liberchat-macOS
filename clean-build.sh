#!/bin/bash

echo " Full cleanup before compilation..."

# Remove all build and cache files
rm -rf node_modules/
rm -rf package-lock.json
rm -rf liberchat-darwin-x64/
rm -rf dist/
rm -f *.dmg
rm -f *.zip

echo " Reinstalling dependencies..."
npm install

echo " Compiling the application..."
npm run package-mac

echo " Compilation finished!"
echo " Generated application: liberchat-darwin-x64/liberchat.app"
echo ""
echo " Checks:"
echo "   • Default server: https://liberchat.cnt-ait-contact.noho.st/liberchat"
echo "   • Splash screen interface with theme toggle"
echo "   • Server history"
echo ""
echo " To test: open liberchat-darwin-x64/liberchat.app"