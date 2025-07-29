const { app, BrowserWindow } = require('electron');
const path = require('path');

function createTimerWindow() {

    let timerWin = new BrowserWindow({
        width: 220,
        height: 200,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        hasShadow: false,
        resizable: false,
        maximizable: false,
        icon: path.join(__dirname, '../../src/assets', 'icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, '../../src/preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    
    if(!app.isPackaged)
        timerWin.webContents.openDevTools({ mode: 'detach' });

    timerWin.loadFile('./src/timer.html');
    timerWin.setTitle('virtual-pet timer');

    return timerWin;
}

module.exports = createTimerWindow;