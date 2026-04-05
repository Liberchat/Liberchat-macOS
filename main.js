const { app, BrowserWindow, ipcMain, session, Menu, Tray, nativeTheme, systemPreferences } = require('electron');
const path = require('path');

let mainWindow;
let splash;
let selectedServer = 'https://liberchat.cnt-ait-contact.noho.st/liberchat';
let tray = null;

function createSplash() {
    splash = new BrowserWindow({
        width: 520,
        height: 340,
        frame: false,
        alwaysOnTop: true,
        resizable: false,
        roundedCorners: true,
        hasShadow: true,
        show: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    splash.loadFile('index.html');
    splash.once('ready-to-show', () => splash.show());
}

function createWindow() {
    if (splash) {
        splash.close();
        splash = null;
    }

    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 900,
        minHeight: 600,
        center: true,
        show: false,
        autoHideMenuBar: true,
        // Exclusive macOS features
        titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
        vibrancy: process.platform === 'darwin' ? 'under-window' : undefined,
        transparent: process.platform === 'darwin',
        icon: process.platform === 'darwin'
            ? path.join(__dirname, 'assets', 'icons', 'liberchat.icns')
            : path.join(__dirname, 'assets', 'icons', 'liberchat.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: true,
            allowRunningInsecureContent: false
        }
    });

    // Exclusive macOS features
    if (process.platform === 'darwin') {
        setupMacOSFeatures();
    }

    // Load Liberchat with native improvements
    mainWindow.loadURL(selectedServer);

    // Inject native improvements once the page is loaded
    mainWindow.webContents.on('dom-ready', () => {
        injectNativeEnhancements();
    });

    // Intercept notifications to make them native
    mainWindow.webContents.on('notification', (event, notification) => {
        event.preventDefault();
        const { Notification } = require('electron');
        new Notification({
            title: 'Liberchat',
            body: notification.body || 'New message',
            icon: path.join(__dirname, 'assets', 'icons', 'liberchat.png')
        }).show();
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.maximize();
        mainWindow.show();
    });

    // macOS behavior: hide instead of close
    if (process.platform === 'darwin') {
        mainWindow.on('close', (event) => {
            if (!app.isQuitting) {
                event.preventDefault();
                mainWindow.hide();
            }
        });
    }
}

// Inject native improvements into the webview
function injectNativeEnhancements() {
    const enhancements = `
        (function() {
            // Local cache to reduce requests
            const cache = new Map();
            
            // Intercept fetch to add cache
            const originalFetch = window.fetch;
            window.fetch = function(...args) {
                const url = args[0];
                if (typeof url === 'string' && cache.has(url)) {
                    return Promise.resolve(new Response(cache.get(url)));
                }
                return originalFetch.apply(this, args).then(response => {
                    if (response.ok && typeof url === 'string') {
                        response.clone().text().then(text => cache.set(url, text));
                    }
                    return response;
                });
            };
            
            // Enhance user interface
            const style = document.createElement('style');
            style.textContent = \`
                /* Native improvements */
                body {
                    -webkit-font-smoothing: antialiased !important;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif !important;
                }
                
                /* Native macOS scrollbars */
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: transparent;
                }
                ::-webkit-scrollbar-thumb {
                    background: rgba(0,0,0,0.2);
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(0,0,0,0.3);
                }
                
                /* Improve animations */
                * {
                    transition: all 0.2s ease !important;
                }
            \`;
            document.head.appendChild(style);
            
            // Native notifications
            if ('Notification' in window) {
                const originalNotification = window.Notification;
                window.Notification = function(title, options) {
                    window.electronAPI && window.electronAPI.showNotification(title, options);
                    return new originalNotification(title, options);
                };
            }
            
            console.log('✅ Liberchat native improvements activated');
        })();
    `;

    mainWindow.webContents.executeJavaScript(enhancements);
}

// Exclusive macOS features
function setupMacOSFeatures() {
    // 1. Native macOS menu
    createMacOSMenu();
    
    // 2. Menu bar icon (Tray)
    createTrayIcon();
    
    // 3. Touch Bar support (if available)
    setupTouchBar();
    
    // 4. Automatic system theme
    setupSystemTheme();
    
    // 5. Window with vibrancy (transparency effect)
    mainWindow.setVibrancy('under-window');
}

// Native macOS menu
function createMacOSMenu() {
    const template = [
        {
            label: 'Liberchat',
            submenu: [
                { label: 'About Liberchat', role: 'about' },
                { type: 'separator' },
                { label: 'Preferences...', accelerator: 'Cmd+,', click: () => openPreferences() },
                { type: 'separator' },
                { label: 'Services', role: 'services', submenu: [] },
                { type: 'separator' },
                { label: 'Hide Liberchat', accelerator: 'Cmd+H', role: 'hide' },
                { label: 'Hide Others', accelerator: 'Cmd+Alt+H', role: 'hideothers' },
                { label: 'Show All', role: 'unhide' },
                { type: 'separator' },
                { label: 'Quit', accelerator: 'Cmd+Q', click: () => app.quit() }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { label: 'Undo', accelerator: 'Cmd+Z', role: 'undo' },
                { label: 'Redo', accelerator: 'Shift+Cmd+Z', role: 'redo' },
                { type: 'separator' },
                { label: 'Cut', accelerator: 'Cmd+X', role: 'cut' },
                { label: 'Copy', accelerator: 'Cmd+C', role: 'copy' },
                { label: 'Paste', accelerator: 'Cmd+V', role: 'paste' },
                { label: 'Select All', accelerator: 'Cmd+A', role: 'selectall' }
            ]
        },
        {
            label: 'View',
            submenu: [
                { label: 'Reload', accelerator: 'Cmd+R', click: () => mainWindow.reload() },
                { label: 'Force Reload', accelerator: 'Cmd+Shift+R', click: () => mainWindow.webContents.reloadIgnoringCache() },
                { label: 'Developer Tools', accelerator: 'F12', click: () => mainWindow.webContents.toggleDevTools() },
                { type: 'separator' },
                { label: 'Zoom In', accelerator: 'Cmd+Plus', click: () => mainWindow.webContents.zoomIn() },
                { label: 'Zoom Out', accelerator: 'Cmd+-', click: () => mainWindow.webContents.zoomOut() },
                { label: 'Actual Size', accelerator: 'Cmd+0', click: () => mainWindow.webContents.zoomLevel = 0 },
                { type: 'separator' },
                { label: 'Toggle Full Screen', accelerator: 'Ctrl+Cmd+F', role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Window',
            submenu: [
                { label: 'Minimize', accelerator: 'Cmd+M', role: 'minimize' },
                { label: 'Close', accelerator: 'Cmd+W', role: 'close' },
                { type: 'separator' },
                { label: 'Bring All to Front', role: 'front' }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// Menu bar icon
function createTrayIcon() {
    tray = new Tray(path.join(__dirname, 'assets', 'icons', 'liberchat.png'));
    
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Open Liberchat', click: () => mainWindow.show() },
        { label: 'New Message', click: () => focusMessageInput() },
        { type: 'separator' },
        { label: 'Quit', click: () => app.quit() }
    ]);
    
    tray.setToolTip('Liberchat - Modern Messaging');
    tray.setContextMenu(contextMenu);
    
    // Click on the icon to show/hide
    tray.on('click', () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
        }
    });
}

// Touch Bar (for MacBook Pro with Touch Bar)
function setupTouchBar() {
    if (process.platform === 'darwin') {
        const { TouchBar } = require('electron');
        const { TouchBarButton, TouchBarSpacer } = TouchBar;

        const touchBar = new TouchBar({
            items: [
                new TouchBarButton({
                    label: '💬 New',
                    backgroundColor: '#c00',
                    click: () => focusMessageInput()
                }),
                new TouchBarSpacer({ size: 'small' }),
                new TouchBarButton({
                    label: '🔄 Refresh',
                    click: () => mainWindow.reload()
                }),
                new TouchBarSpacer({ size: 'small' }),
                new TouchBarButton({
                    label: '⚙️ Settings',
                    click: () => openPreferences()
                })
            ]
        });

        mainWindow.setTouchBar(touchBar);
    }
}

// Automatic system theme
function setupSystemTheme() {
    // Track system theme changes
    nativeTheme.on('updated', () => {
        const isDark = nativeTheme.shouldUseDarkColors;
        mainWindow.webContents.executeJavaScript(`
            document.body.classList.toggle('system-dark', ${isDark});
        `);
    });
}

// Utility functions
function openPreferences() {
    // Open a preferences window (to be implemented)
    console.log('Opening preferences...');
}

function focusMessageInput() {
    mainWindow.show();
    mainWindow.focus();
    // Focus on the message field in the webview
    mainWindow.webContents.executeJavaScript(`
        const messageInput = document.querySelector('textarea, input[type="text"]');
        if (messageInput) messageInput.focus();
    `);
}

app.whenReady().then(() => {
    session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
        if (permission === 'media') {
            callback(true);
        } else {
            callback(false);
        }
    });

    ipcMain.handle('request-microphone', async () => {
        return true;
    });

    // Native notifications
    ipcMain.handle('show-notification', async (event, title, options) => {
        const { Notification } = require('electron');
        new Notification({
            title: title || 'Liberchat',
            body: options?.body || '',
            icon: path.join(__dirname, 'assets', 'icons', 'liberchat.png')
        }).show();
    });

    ipcMain.on('server-selected', (event, server) => {
        selectedServer = server;
        if (splash) splash.close();
        createWindow();
    });

    createSplash();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createSplash();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// macOS: Reactivate the app when clicking on the dock icon
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createSplash();
    } else if (mainWindow) {
        mainWindow.show();
    }
});

// macOS: Handle quit properly
app.on('before-quit', () => {
    app.isQuitting = true;
});