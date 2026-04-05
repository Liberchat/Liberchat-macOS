<div align="center">
  <a href="https://github.com/Liberchat/Liberchat">
    <img src="assets/icons/liberchat.png" alt="Liberchat Logo" width="96" height="96" style="margin-bottom: 10px;" />
  </a>
  
  <h1 style="margin-top: 0;">Liberchat MacOS Desktop</h1>
  
  <a href="https://github.com/Liberchat/Liberchat">Main project on GitHub</a>
  
  <br/>
  
  <img src="https://img.shields.io/badge/Electron-22.x-blue?logo=electron"/>
  <img src="https://img.shields.io/badge/MacOS-Native-success?logo=apple"/>
  <img src="https://img.shields.io/badge/UI-Native-red"/>
  <img src="https://img.shields.io/badge/TouchBar-Support-orange"/>
  <img src="https://img.shields.io/badge/license-MIT-green"/>
  
  <br/>
  <em>Modern messaging application with exclusive native macOS features.</em>
</div>

##  Key Features

### Modern Interface
- **Smart splash screen** with server selection and theme
- **Server history**: Saves the last 3 servers used
- **Adaptive theme**: Dark/light mode with saved preferences
- **Optimized interface**: Reduced webview dependence with native improvements

### Security & Performance
- **Enhanced security**: contextIsolation, secured preload
- **Smart cache**: Reduced network requests
- **Native notifications**: Complete system integration
- **Automatic permissions**: Mic/camera configured

##  Exclusive macOS Features

### Native Interface
- **Complete macOS menu** with native Cmd+ shortcuts
- **Hidden title bar** with vibrancy effect
- **Transparent window** integrated with the system
- **Automatic system theme** (follows Dark/Light mode)

### Productivity
- **Menu bar icon**: Quick access and context menu
- **Touch Bar**: Quick buttons (New message, Refresh, Settings)
- **Native behavior**: Close = hide, reactivate from Dock
- **System shortcuts**: Cmd+Q, Cmd+W, Cmd+M, Cmd+R, Cmd+,

### System Integration
- **Native macOS notifications** with sound and badges
- **Native scrollbars** with macOS style
- **System fonts** (-apple-system) for perfect rendering
- **Smooth animations** optimized for macOS

##  Installation & Launch

```bash
# Install dependencies
npm install

# Launch in development mode
npm start

# Generate macOS app (.app folder)
npm run package-mac

# Generate DMG file (Mac installer)
npx appdmg dmg.json liberchat-macos.dmg
```

### Generated Files
- `liberchat-darwin-x64/liberchat.app` (macOS Application)
- `liberchat-macos.dmg` (DMG Installer)

##  macOS Installation

### Recommended Method (DMG)
1. Download `liberchat-macos.dmg`
2. Double-click to mount the disk image
3. Drag the Liberchat icon into the Applications folder
4. Launch from Launchpad or Applications

### Alternative Method (.app)
- Copy `liberchat-darwin-x64/liberchat.app` to `/Applications/`

##  Configuration

### First Launch
1. **Server selection**: Choose your Liberchat server
2. **Theme**: Click on 🌙/☀️ to toggle between light/dark
3. **History**: Recent servers will appear automatically

### Advanced Features
- **Menu bar**: Click on the Liberchat icon in the menu bar
- **Touch Bar**: Use the quick buttons (MacBook Pro)
- **Shortcuts**: Cmd+, for preferences, Cmd+R to refresh

##  Usage

### Quick Server Selection
- **Click in URL field** → Shows recent servers
- **Selection** → Automatically fills the field
- **Auto-save** of the last 3 servers

### Themes
- **Toggle button** at the top right of the splash screen
- **Auto-save** of the choice
- **System theme**: Automatically follows macOS preferences

### macOS Shortcuts
- `Cmd+Q`: Quit the application
- `Cmd+W`: Close window (hides app)
- `Cmd+M`: Minimize to Dock
- `Cmd+R`: Reload page
- `Cmd+,`: Open preferences
- `Cmd+H`: Hide application

## Dependencies

### Main
- [Electron](https://www.electronjs.org/) ^22.x
- [electron-packager](https://github.com/electron/electron-packager)
- [appdmg](https://github.com/LinusU/node-appdmg)

### macOS APIs Used
- **Tray**: Menu bar icon
- **TouchBar**: MacBook Pro support
- **nativeTheme**: System theme
- **systemPreferences**: System integration
- **Menu**: Native macOS menus

##  Development

### Project Structure
```
liberchat-macos/
├── main.js              # Main Electron process
├── preload.js           # Secured preload script
├── index.html           # Splash screen with selector
├── assets/              # Icons and resources
│   └── icons/
│       ├── liberchat.icns
│       └── liberchat.png
├── package.json         # npm configuration
└── README-macos.md      # Documentation
```

### Technical Features
- **Isolated processes**: Maximum security
- **Secured IPC**: Inter-process communication
- **Local cache**: localStorage for history
- **Platform detection**: macOS conditional features

##  Changelog

### Version 2.0.0 - Native macOS Edition ✨
**Major new features:**

####  Native macOS Integration
-  Complete macOS menu with Cmd+ shortcuts
-  Menu bar icon with context menu
-  Touch Bar support for MacBook Pro
-  Vibrancy effect and transparent window
-  Automatic system theme (Dark/Light mode)

####  Improved Interface
-  Splash screen with theme selector (🌙/☀️)
-  History of last 3 used servers
-  Smart dropdown under the URL field
-  Automatic save of preferences

####  Performance & UX
-  Reduced webview dependence
-  Smart cache for requests
-  Native macOS notifications
-  Native system fonts and scrollbars
-  Native behavior (close = hide)

####  Technical Improvements
-  Secured architecture with isolated processes
-  Secured IPC between processes
-  Local state management (localStorage)
-  Conditional platform detection

##  License

MIT License - See the LICENSE file for details.

##  Contribution

Contributions are welcome! Feel free to:
- Report bugs
- Propose enhancements
- Add macOS features

---

<div align="center">
  <strong>Liberchat macOS Desktop v2.0.0</strong><br/>
  <em>Native application with full system integration</em><br/>
  <br/>
  <img src="https://img.shields.io/badge/Version-2.0.0-brightgreen?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/macOS-Native-blue?style=for-the-badge&logo=apple"/>
</div>
