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
        // Fonctionnalités macOS exclusives
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

    // Fonctionnalités macOS exclusives
    if (process.platform === 'darwin') {
        setupMacOSFeatures();
    }

    // Charger Liberchat avec améliorations natives
    mainWindow.loadURL(selectedServer);

    // Injecter des améliorations natives une fois la page chargée
    mainWindow.webContents.on('dom-ready', () => {
        injectNativeEnhancements();
    });

    // Intercepter les notifications pour les rendre natives
    mainWindow.webContents.on('notification', (event, notification) => {
        event.preventDefault();
        const { Notification } = require('electron');
        new Notification({
            title: 'Liberchat',
            body: notification.body || 'Nouveau message',
            icon: path.join(__dirname, 'assets', 'icons', 'liberchat.png')
        }).show();
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.maximize();
        mainWindow.show();
    });

    // Comportement macOS : masquer au lieu de fermer
    if (process.platform === 'darwin') {
        mainWindow.on('close', (event) => {
            if (!app.isQuitting) {
                event.preventDefault();
                mainWindow.hide();
            }
        });
    }
}

// Injecter des améliorations natives dans la webview
function injectNativeEnhancements() {
    const enhancements = `
        (function() {
            // Cache local pour réduire les requêtes
            const cache = new Map();
            
            // Intercepter fetch pour ajouter du cache
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
            
            // Améliorer l'interface utilisateur
            const style = document.createElement('style');
            style.textContent = \`
                /* Améliorations natives */
                body {
                    -webkit-font-smoothing: antialiased !important;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif !important;
                }
                
                /* Scrollbars natives macOS */
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
                
                /* Améliorer les animations */
                * {
                    transition: all 0.2s ease !important;
                }
            \`;
            document.head.appendChild(style);
            
            // Notifications natives
            if ('Notification' in window) {
                const originalNotification = window.Notification;
                window.Notification = function(title, options) {
                    window.electronAPI && window.electronAPI.showNotification(title, options);
                    return new originalNotification(title, options);
                };
            }
            
            console.log('✅ Améliorations natives Liberchat activées');
        })();
    `;

    mainWindow.webContents.executeJavaScript(enhancements);
}

// Fonctionnalités exclusives macOS
function setupMacOSFeatures() {
    // 1. Menu macOS natif
    createMacOSMenu();
    
    // 2. Icône dans la barre de menu (Tray)
    createTrayIcon();
    
    // 3. Touch Bar support (si disponible)
    setupTouchBar();
    
    // 4. Thème système automatique
    setupSystemTheme();
    
    // 5. Fenêtre avec vibrancy (effet de transparence)
    mainWindow.setVibrancy('under-window');
}

// Menu macOS natif
function createMacOSMenu() {
    const template = [
        {
            label: 'Liberchat',
            submenu: [
                { label: 'À propos de Liberchat', role: 'about' },
                { type: 'separator' },
                { label: 'Préférences...', accelerator: 'Cmd+,', click: () => openPreferences() },
                { type: 'separator' },
                { label: 'Services', role: 'services', submenu: [] },
                { type: 'separator' },
                { label: 'Masquer Liberchat', accelerator: 'Cmd+H', role: 'hide' },
                { label: 'Masquer les autres', accelerator: 'Cmd+Alt+H', role: 'hideothers' },
                { label: 'Tout afficher', role: 'unhide' },
                { type: 'separator' },
                { label: 'Quitter', accelerator: 'Cmd+Q', click: () => app.quit() }
            ]
        },
        {
            label: 'Édition',
            submenu: [
                { label: 'Annuler', accelerator: 'Cmd+Z', role: 'undo' },
                { label: 'Rétablir', accelerator: 'Shift+Cmd+Z', role: 'redo' },
                { type: 'separator' },
                { label: 'Couper', accelerator: 'Cmd+X', role: 'cut' },
                { label: 'Copier', accelerator: 'Cmd+C', role: 'copy' },
                { label: 'Coller', accelerator: 'Cmd+V', role: 'paste' },
                { label: 'Tout sélectionner', accelerator: 'Cmd+A', role: 'selectall' }
            ]
        },
        {
            label: 'Affichage',
            submenu: [
                { label: 'Recharger', accelerator: 'Cmd+R', click: () => mainWindow.reload() },
                { label: 'Forcer le rechargement', accelerator: 'Cmd+Shift+R', click: () => mainWindow.webContents.reloadIgnoringCache() },
                { label: 'Outils de développement', accelerator: 'F12', click: () => mainWindow.webContents.toggleDevTools() },
                { type: 'separator' },
                { label: 'Zoom avant', accelerator: 'Cmd+Plus', click: () => mainWindow.webContents.zoomIn() },
                { label: 'Zoom arrière', accelerator: 'Cmd+-', click: () => mainWindow.webContents.zoomOut() },
                { label: 'Zoom réel', accelerator: 'Cmd+0', click: () => mainWindow.webContents.zoomLevel = 0 },
                { type: 'separator' },
                { label: 'Plein écran', accelerator: 'Ctrl+Cmd+F', role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Fenêtre',
            submenu: [
                { label: 'Réduire', accelerator: 'Cmd+M', role: 'minimize' },
                { label: 'Fermer', accelerator: 'Cmd+W', role: 'close' },
                { type: 'separator' },
                { label: 'Tout mettre au premier plan', role: 'front' }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// Icône dans la barre de menu
function createTrayIcon() {
    tray = new Tray(path.join(__dirname, 'assets', 'icons', 'liberchat.png'));
    
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Ouvrir Liberchat', click: () => mainWindow.show() },
        { label: 'Nouveau message', click: () => focusMessageInput() },
        { type: 'separator' },
        { label: 'Quitter', click: () => app.quit() }
    ]);
    
    tray.setToolTip('Liberchat - Messagerie moderne');
    tray.setContextMenu(contextMenu);
    
    // Clic sur l'icône pour afficher/masquer
    tray.on('click', () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
        }
    });
}

// Touch Bar (pour MacBook Pro avec Touch Bar)
function setupTouchBar() {
    if (process.platform === 'darwin') {
        const { TouchBar } = require('electron');
        const { TouchBarButton, TouchBarSpacer } = TouchBar;

        const touchBar = new TouchBar({
            items: [
                new TouchBarButton({
                    label: '💬 Nouveau',
                    backgroundColor: '#c00',
                    click: () => focusMessageInput()
                }),
                new TouchBarSpacer({ size: 'small' }),
                new TouchBarButton({
                    label: '🔄 Actualiser',
                    click: () => mainWindow.reload()
                }),
                new TouchBarSpacer({ size: 'small' }),
                new TouchBarButton({
                    label: '⚙️ Paramètres',
                    click: () => openPreferences()
                })
            ]
        });

        mainWindow.setTouchBar(touchBar);
    }
}

// Thème système automatique
function setupSystemTheme() {
    // Suivre les changements de thème système
    nativeTheme.on('updated', () => {
        const isDark = nativeTheme.shouldUseDarkColors;
        mainWindow.webContents.executeJavaScript(`
            document.body.classList.toggle('system-dark', ${isDark});
        `);
    });
}

// Fonctions utilitaires
function openPreferences() {
    // Ouvrir une fenêtre de préférences (à implémenter)
    console.log('Ouverture des préférences...');
}

function focusMessageInput() {
    mainWindow.show();
    mainWindow.focus();
    // Focus sur le champ de message dans la webview
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

    // Notifications natives
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

// macOS : Réactiver l'app quand on clique sur l'icône du dock
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createSplash();
    } else if (mainWindow) {
        mainWindow.show();
    }
});

// macOS : Gérer la fermeture proprement
app.on('before-quit', () => {
    app.isQuitting = true;
});