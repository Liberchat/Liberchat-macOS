const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  requestMicrophone: () => ipcRenderer.invoke('request-microphone'),
  selectServer: (server) => ipcRenderer.send('server-selected', server),
  showNotification: (title, options) => ipcRenderer.invoke('show-notification', title, options)
});
