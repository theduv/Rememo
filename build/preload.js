const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  store: {
    get(key) {
      return ipcRenderer.sendSync("electron-store-get", key);
    },
    set(property, val) {
      ipcRenderer.send("electron-store-set", property, val);
    },
    // Other method you want to add like has(), reset(), etc.
  },
  // Any other methods you want to expose in the window object.
  // ...
});
