const { app, ipcMain } = require('electron');

ipcMain.on('quit-app', () => {
    if (process.platform !== 'darwin') app.quit();
});