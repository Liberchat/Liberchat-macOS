const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  requestMicrophone: () => ipcRenderer.invoke('request-microphone'),
  selectServer: (server) => ipcRenderer.send('server-selected', server)
});
