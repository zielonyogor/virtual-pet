const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { getRepos } = require('./electron/storage.js');
const { exec } = require('child_process');

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
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('quit-app', () => {
    if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('git-pull', () => {
    console.log(`got`);

    const repos = getRepos();
    console.log(repos);
    repos.forEach(repo => {
        exec('git pull origin', { cwd: repo }, (error, stdout, stderr) => {
            if(error) {
                console.error(`Git pull failed in ${repo}: ${error.message}`);
                return;
            }
            console.log(`Git pulled in ${repo}:\n${stdout}`);
        })
    });
});