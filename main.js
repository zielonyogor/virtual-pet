const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;

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
    
    win.webContents.openDevTools({ mode: 'detach' });
    win.setSkipTaskbar(true);

    win.loadFile('index.html');
    //win.setIgnoreMouseEvents(false);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('quit-app', () => {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('git-pull', (projectName) => {
    console.log(`got: ${projectName}`);
})