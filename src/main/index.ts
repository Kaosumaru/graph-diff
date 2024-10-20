import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { extname, join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import { readFile } from 'node:fs/promises';
import { parse } from 'ts-command-line-args';
import log from 'electron-log/main';
import { Graph } from '../diff/interface/NodeInterface';
import { DiffGraph } from '../diff/logic/DiffGraph';
import { convertGraph } from '../diff/converter/converter';

log.initialize();

log.info(`args: ${JSON.stringify(process.argv)}`);

interface IArguments {
    basePath?: string;
    newPath?: string;
    'remote-debugging-port'?: number;
}

export const args = parse<IArguments>({
    basePath: { type: String, optional: true },
    newPath: { type: String, optional: true },
    'remote-debugging-port': { type: Number, optional: true }
});

async function getBaseFile(): Promise<[string, string]> {
    let path = args.basePath;
    if (process.env.NODE_ENV && !path) {
        path = 'D:\\Unity\\Test Shader\\Assets\\Samples\\Shader Graph\\14.0.11\\Production Ready Shaders\\Lit\\HDRPLit.shadergraph';
    }

    log.info(`getBaseFile: ${path}`);

    if (!path) throw new Error('basePath param is not set');
    const data = await readFile(path, {
        encoding: 'utf8'
    });
    return [data, extname(path)];
}

async function getNewFile(): Promise<[string, string]> {
    let path = args.newPath;
    if (process.env.NODE_ENV && !path) {
        path = 'D:\\Unity\\Test Shader\\Assets\\Samples\\Shader Graph\\14.0.11\\Production Ready Shaders\\Lit\\HDRPLit.shadergraph';
    }

    log.info(`getNewFile: ${path}`);

    if (!path) throw new Error('newPath param is not set');
    const data = await readFile(path, {
        encoding: 'utf8'
    });
    return [data, extname(path)];
}

async function getDiff(): Promise<Graph> {
    const [data1, ext1] = await getBaseFile();
    const [data2, ext2] = await getNewFile();

    const graph1 = convertGraph(data1, ext1);
    const graph2 = convertGraph(data2, ext2);

    return DiffGraph(graph1, graph2);
}

function createWindow(): void {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        title: args.newPath ? `Graph Diff (${args.newPath})` : 'Graph Diff',
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false
        }
    });

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron');

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window);
    });

    // IPC test
    ipcMain.on('ping', () => console.log('pong'));
    ipcMain.handle('file:getDiff', getDiff);

    createWindow();

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
