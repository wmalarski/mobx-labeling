/* eslint-disable no-undef */
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    async saveDefinition(projectDefinition) {
      return ipcRenderer.invoke("SaveDefinition", projectDefinition);
    },
  },
});
