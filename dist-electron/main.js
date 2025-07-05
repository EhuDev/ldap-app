import { app, BrowserWindow } from 'electron';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
function createWindow() {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
        }
    });
    win.loadFile(join(__dirname, '../dist/index.html'));
    win.webContents.openDevTools(); //optional: Open DevTools for debugging
}
app.whenReady().then(createWindow);
