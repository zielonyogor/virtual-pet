const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createConfigWindow(bounds) {
    let configWin = new BrowserWindow({
        width: 400,
        height: 600,
        alwaysOnTop: true,
        hasShadow: false,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, '../../src/preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    
    if(!app.isPackaged)
        configWin.webContents.openDevTools({ mode: 'detach' });
    
    configWin.setSkipTaskbar(true);

    configWin.loadFile('tasks.html');

    return configWin;
}

module.exports = createConfigWindow;