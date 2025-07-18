const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { exec } = require('child_process');
const git = require('./electron/git.js');
const web = require('./electron/web.js');
const createMainWindow = require('./electron/windows/mainWindow.js');
const createTaskWindow = require('./electron/windows/taskWindow.js');
const createConfigWindow = require('./electron/windows/configWindow.js');
const createTimerWindow = require('./electron/windows/timerWindow.js');

require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});

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

ipcMain.on('close-window', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if(window) window.close();
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
    const locked = !taskWin;
    win.webContents.send('task-window-lock', { locked });

    if (taskWin) {
        if (!taskWin.isDestroyed()) {
            taskWin.close();
        }
        taskWin = null;
        return;
    }
    
    taskWin = createTaskWindow(bounds);
});

// Git and git config
ipcMain.on('config-window-toggle', () => {
    configWin = createConfigWindow();
});

ipcMain.handle('open-git-dialog', async () => {
    const result = await dialog.showOpenDialog({
        title: "Choose a Git repository folder",
        properties: ['openDirectory', 'multiSelections']
    });
    
    if (!result.canceled) {
        result.filePaths.forEach(git.addRepo);
        return git.getRepos();
    }
    
    return git.getRepos();
});

ipcMain.handle('git-get-repos', () => {
    return git.getRepos();
})

ipcMain.handle('git-delete-repo', (event, repoPath) => {
    git.deleteRepo(repoPath);
    return git.getRepos();
})

ipcMain.on('git-pull', () => {
    git.pullRepos();
});

ipcMain.on('timer-open', () => {
    createTimerWindow();
});

ipcMain.on('facebook-open', () => {
    web.openFacebook();
})