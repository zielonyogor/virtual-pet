const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    // quit app
    quitApp: () => ipcRenderer.send('quit-app'),

    // git pull
    executeGitPull: () => {
        console.log('pulling...');
        ipcRenderer.send('git-pull');
    },

    openVSCode: () => {
        ipcRenderer.send('vscode-open');
    }
});