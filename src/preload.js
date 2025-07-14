const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    // quit app
    quitApp: () => ipcRenderer.send('quit-app'),

    // open task window
    toggleTaskWindow: (bounds) => ipcRenderer.send('task-window-toggle', bounds),

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