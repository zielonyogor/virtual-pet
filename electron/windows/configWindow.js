const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createConfigWindow(bounds) {
    let configWin = new BrowserWindow({
        width: 500,
        height: 500,
        resizable: false,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, '../../src/preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    
    if(!app.isPackaged)
        configWin.webContents.openDevTools({ mode: 'detach' });

    configWin.loadFile('./src/config.html');

    return configWin;
}

module.exports = createConfigWindow;