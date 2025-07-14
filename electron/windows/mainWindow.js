const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { getRepos } = require('./electron/storage.js');
const { exec } = require('child_process');

let win;
let taskWin = null; // tasks

app.on('ready' ,() => {
    win = new BrowserWindow({
        width: 200,
        height: 200,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        hasShadow: false,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'src/preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
        x: 0,
        y: 0,
    });
    
    if(!app.isPackaged)
        win.webContents.openDevTools({ mode: 'detach' });

    win.setSkipTaskbar(true);

    win.loadFile('index.html');
});
