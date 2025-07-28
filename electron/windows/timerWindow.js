const { app, BrowserWindow } = require('electron');
const path = require('path');

function createTimerWindow() {

    let timerWin = new BrowserWindow({
        width: 200,
        height: 200,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        hasShadow: false,
        resizable: false,
        maximizable: false,
        webPreferences: {
            preload: path.join(__dirname, '../../src/preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    
    if(!app.isPackaged)
        timerWin.webContents.openDevTools({ mode: 'detach' });
    
    timerWin.setSkipTaskbar(true);

    timerWin.loadFile('./src/timer.html');

    return timerWin;
}

module.exports = createTimerWindow;