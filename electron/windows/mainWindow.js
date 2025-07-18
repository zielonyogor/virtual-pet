const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createMainWindow() {
    win = new BrowserWindow({
        width: 194,
        height: 160,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        hasShadow: false,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, '../../src/preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
        x: 0,
        y: 0,
    });
    
    if(!app.isPackaged)
        win.webContents.openDevTools({ mode: 'detach' });

    win.setSkipTaskbar(true);

    win.loadFile('./src/index.html');

    return win;
};

module.exports = createMainWindow;