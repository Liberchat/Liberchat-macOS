#  Liberchat macOS Compilation

## Prerequisites

- **macOS** (required to create the DMG)
- **Node.js** and **npm**
- **Homebrew** (to install create-dmg)

##  Quick Compilation

```bash
# Make the script executable (first time only)
chmod +x build-macos.sh

# Compile and create the DMG
./build-macos.sh
```

##  Detailed Steps

### 1. Tool Installation
```bash
# Install Homebrew if necessary
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install create-dmg
brew install create-dmg
```

### 2. Manual Compilation
```bash
# Install dependencies
npm install

# Compile the application
npm run package-mac

# Create the DMG
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

##  Generated Files

- `liberchat-darwin-x64/liberchat.app` - macOS Application
- `liberchat-macos-v2.0.0.dmg` - DMG Installer

## Server Configuration

The default server is configured in:
- `index.html` (line 248): input field
- `main.js` (line 6): selectedServer variable

##  Testing the Application

```bash
# Launch the compiled application
open liberchat-darwin-x64/liberchat.app

# Or test the DMG
open liberchat-macos-v2.0.0.dmg
```

---
**Note**: This script must be executed on macOS to generate the DMG file.