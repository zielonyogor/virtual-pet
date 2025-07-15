const { app, BrowserWindow, ipcMain } = require('electron');
const { getRepos } = require('./electron/storage.js');
const { exec } = require('child_process');
const createMainWindow = require('./electron/windows/mainWindow.js');
const createTaskWindow = require('./electron/windows/taskWindow.js');
const createConfigWindow = require('./electron/windows/configWindow.js');

let win;
let taskWin = null; // tasks
let configWin = null; // config

app.on('ready', () => {
    win = createMainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC calls
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
    console.log(bounds);
    if (taskWin) {
        if (!taskWin.isDestroyed()) {
            taskWin.close();
        }
        taskWin = null;
        return;
    }

    taskWin = createTaskWindow(bounds);
});

ipcMain.on('config-window-toggle', () => {
    configWin = createConfigWindow();
});

ipcMain.on('open-git-dialog', () => {
    const { dialog } = require('electron');
    //console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
});