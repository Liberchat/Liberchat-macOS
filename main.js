const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');

let mainWindow;
let splash;
let selectedServer = 'https://liberchat-3-0-1.onrender.com/';

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
        icon: process.platform === 'darwin' 
            ? path.join(__dirname, 'assets', 'icons', 'liberchat.icns') 
            : path.join(__dirname, 'assets', 'icons', 'liberchat.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    mainWindow.loadURL(selectedServer);
    mainWindow.once('ready-to-show', () => {
        mainWindow.maximize();
        mainWindow.show();
    });
}

app.whenReady().then(() => {
    session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
        if (permission === 'media') {
            callback(true); // Autorise micro/caméra
        } else {
            callback(false);
        }
    });

    ipcMain.handle('request-microphone', async () => {
        return true;
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
