const { app, BrowserWindow, ipcMain } = require('electron');
// include the Node.js 'path' module at the top of your file
const path = require('node:path');
const mommy = require('node-mommy');

// modify your existing createWindow() function
const createWindow = () => {
    const window = new BrowserWindow({
        resizable: false,
        movable: false,
        minimizable: true,
        transparent: true,
        focusable: false,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, './preload.js'),
        }
    });

    window.loadFile('index.html');
    window.maximize();
    window.webContents.openDevTools();

}

app.disableHardwareAcceleration();

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})