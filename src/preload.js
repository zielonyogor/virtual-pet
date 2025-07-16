const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    // quit app
    quitApp: () => ipcRenderer.send('quit-app'),

    closeWindow: () => ipcRenderer.send('close-window'),

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
        console.log('pulling...');
        ipcRenderer.send('git-pull');
    },

    openVSCode: () => {
        ipcRenderer.send('vscode-open');
    },

    openTimer: () => ipcRenderer.send('open-timer')
});