import { contextBridge } from "electron";
import { ipcRenderer } from "electron";

export const api = {
    setTitle: (title: string) => ipcRenderer.send('set-title', title)
}

contextBridge.exposeInMainWorld("api", api);