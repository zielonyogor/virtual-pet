const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { getRepos, addRepo, deleteRepo } = require('./electron/git.js');
const { exec } = require('child_process');
const createMainWindow = require('./electron/windows/mainWindow.js');
const createTaskWindow = require('./electron/windows/taskWindow.js');
const createConfigWindow = require('./electron/windows/configWindow.js');
const createTimerWindow = require('./electron/windows/timerWindow.js');

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
        result.filePaths.forEach(addRepo);
        return getRepos();
    }
    
    return getRepos();
});

ipcMain.handle('git-get-repos', () => {
    return getRepos();
})

ipcMain.handle('git-delete-repo', (event, repoPath) => {
    deleteRepo(repoPath);
    return getRepos();
})

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

ipcMain.on('open-timer', () => {
    createTimerWindow();
});