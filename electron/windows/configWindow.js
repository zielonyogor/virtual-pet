const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createConfigWindow() {
    console.log(path.join(__dirname, '../../src/assets', 'icon.ico'));
    let configWin = new BrowserWindow({
        width: 500,
        height: 500,
        resizable: false,
        frame: false,
        transparent: true,
        maximizable: false,
        icon: path.join(__dirname, '../../src/assets', 'icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, '../../src/preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    
    if(!app.isPackaged)
        configWin.webContents.openDevTools({ mode: 'detach' });

    configWin.loadFile('./src/config.html');
    configWin.setTitle('virtual-pet config');

    return configWin;
}

module.exports = createConfigWindow;