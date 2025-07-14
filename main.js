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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('quit-app', () => {
    if (process.platform !== 'darwin') app.quit();
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

ipcMain.on('vscode-open', () => {
    exec('code', (error, stdout, stderr) => {
        if(error) {
            console.error(`Failed to open VSCode: ${error.message}`);
            return;
        }
    });
});

ipcMain.on('get-window-bounds', (event) => {
  const win = BrowserWindow.getFocusedWindow();
  event.returnValue = win.getBounds();
});

ipcMain.on('task-window-toggle', (event, bounds) => {
    if (taskWin) {
        if (!taskWin.isDestroyed()) {
            taskWin.close();
        }
        taskWin = null;
        return;
    }

    taskWin = new BrowserWindow({
        width: 180,
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
    });

    console.log(bounds);
    const x = bounds.x + bounds.width;
    const y = bounds.y;
    taskWin.setBounds({ x, y, width: 180, height: 220 });
    
    if(!app.isPackaged)
        taskWin.webContents.openDevTools({ mode: 'detach' });
    
    taskWin.setSkipTaskbar(true);

    taskWin.loadFile('tasks.html');
});