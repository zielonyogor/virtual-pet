const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    // quit app
    quitApp: () => ipcRenderer.send('quit-app'),

    // open task window
    toggleTaskWindow: (event, bounds) => ipcRenderer.send('task-window-toggle', event, bounds),

    // open config window
    toggleConfigWindow: () => ipcRenderer.send('config-window-toggle'),
    openGitDialog: () => ipcRenderer.send('open-git-dialog'),

    getWindowBounds: () => ipcRenderer.sendSync('get-window-bounds'),

    // git pull
    executeGitPull: () => {
        console.log('pulling...');
        ipcRenderer.send('git-pull');
    },

    openVSCode: () => {
        ipcRenderer.send('vscode-open');
    }
});