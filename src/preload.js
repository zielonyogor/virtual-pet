const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    // character lock
    onTaskWindowLock: (callback) => ipcRenderer.on('task-window-lock', callback),

    // quit app
    quitApp: () => ipcRenderer.send('quit-app'),

    closeWindow: () => ipcRenderer.send('close-window'),
    minimizeWindow: () => ipcRenderer.send('minimize-window'),

    // open task window
    toggleTaskWindow: (event, bounds) => ipcRenderer.send('task-window-toggle', event, bounds),

    getWindowBounds: () => ipcRenderer.sendSync('get-window-bounds'),

    // open config window
    toggleConfigWindow: () => ipcRenderer.send('config-window-toggle'),
    openGitDialog: () => ipcRenderer.invoke('open-git-dialog'),

    getRepos: () => ipcRenderer.invoke('git-get-repos'),
    deleteRepo: (repoPath) => ipcRenderer.invoke('git-delete-repo', repoPath),

    // git pull
    executeGitPull: () => {
        ipcRenderer.send('git-pull');
    },

    openVSCode: () => {
        ipcRenderer.send('vscode-open');
    },

    openFacebook: () => {
        ipcRenderer.send('facebook-open');
    },

    openTimer: () => ipcRenderer.send('timer-open'),

    getTimes: () => ipcRenderer.invoke('time-get-times'),

    submitNewTimes: (newTimes) => ipcRenderer.invoke('submit-new-times', newTimes),
});