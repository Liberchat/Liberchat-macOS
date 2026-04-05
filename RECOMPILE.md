#  IMPORTANT - Recompilation required

## Changes not visible?

If the modifications (new server, interface, etc.) are not visible in the compiled application, this is normal! You must **recompile the application** for the changes to take effect.

##  Recompile on macOS

### Automatic Method (Recommended)
```bash
# Remove the old build
rm -rf liberchat-darwin-x64/

# Recompile with the script
./build-macos.sh
```

### Manual Method
```bash
# Remove the old build
rm -rf liberchat-darwin-x64/

# Install dependencies (if necessary)
npm install

# Recompile the application
npm run package-mac

# Create DMG (optional)
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
```

##  Checks after compilation

1. **Default Server**: `https://liberchat.cnt-ait-contact.noho.st/liberchat`
2. **Splash screen interface** with theme selector 🌙/☀️
3. **Server history** (dropdown under the URL field)
4. **macOS Menu** with Cmd+ shortcuts
5. **Menu bar icon** (top right)

## If the changes are still not visible

1. Verify that you are launching the **new** compiled application
2. Completely remove the old app: `rm -rf liberchat-darwin-x64/`
3. Recompile: `npm run package-mac`
4. Test the new app: `open liberchat-darwin-x64/liberchat.app`

---
**Note**: The compiled application is a "snapshot" of the source code at the time of compilation. Any changes to the source code require recompilation.