const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

//let taskWin = null; // tasks

function createTaskWindow(bounds) {

    let taskWin = new BrowserWindow({
        width: 180,
        height: 200,
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
    });

    console.log(bounds);
    const x = bounds.x + bounds.width;
    const y = bounds.y;
    taskWin.setBounds({ x, y, width: 180, height: 220 });
    
    if(!app.isPackaged)
        taskWin.webContents.openDevTools({ mode: 'detach' });
    
    taskWin.setSkipTaskbar(true);

    taskWin.loadFile('tasks.html');

    return taskWin;
}

module.exports = createTaskWindow;