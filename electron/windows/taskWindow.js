const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

const TASK_WIDTH = 100;
const TASK_HEIGHT = 180;

function createTaskWindow(bounds) {

    let taskWin = new BrowserWindow({
        width: TASK_WIDTH,
        height: TASK_HEIGHT,
        frame: false,
        alwaysOnTop: true,
        transparent: true, // has to stay because of windows?
        hasShadow: false,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, '../../src/preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    const pos = calculateBounds(bounds);
    taskWin.setBounds({ x: pos.x, y: pos.y, width: TASK_WIDTH, height: TASK_HEIGHT });
    
    if(!app.isPackaged)
        taskWin.webContents.openDevTools({ mode: 'detach' });
    
    taskWin.setSkipTaskbar(true);

    taskWin.loadFile('./src/tasks.html');

    return taskWin;
}

function calculateBounds(bounds) {
    const display = screen.getDisplayMatching(bounds);

    let x = bounds.x + bounds.width;
    let y = bounds.y;
    
    if(x + TASK_WIDTH >= display.workArea.width) x = bounds.x - TASK_WIDTH; // fix X pos
    if(y + TASK_HEIGHT >= display.workArea.height) y = display.workArea.height - TASK_HEIGHT; // fix Y pos
    
    return {
        x,
        y,
    }
}

module.exports = createTaskWindow;