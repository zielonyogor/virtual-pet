const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    quitApp: () => ipcRenderer.send('quit-app'),
    executeGitPull: () => {
        console.log('pulling...');
        ipcRenderer.send('git-pull', 'test-project');
    }
});