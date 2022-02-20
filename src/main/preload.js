/* eslint-disable no-undef */
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  ipcDefinitions: {
    async saveDefinition(projectDefinition) {
      return ipcRenderer.invoke("WriteDefinition", projectDefinition);
    },
    async readDefinitions({ start, limit, query }) {
      return ipcRenderer.invoke("ReadDefinitions", { start, limit, query });
    },
    async readDefinition(projectDefinitionId) {
      return ipcRenderer.invoke("ReadDefinition", projectDefinitionId);
    },
    async removeDefinition(projectDefinitionId) {
      return ipcRenderer.invoke("RemoveDefinition", projectDefinitionId);
    },
  },
  ipcResources: {
    openDialog(args) {
      return ipcRenderer.send("OpenDialog", args);
    },
    addOnOpenListener(callback) {
      ipcRenderer.on("OpenDialog", callback);
    },
    removeOnOpenListener(callback) {
      ipcRenderer.removeListener("OpenDialog", callback);
    },
    saveDialog(args) {
      return ipcRenderer.send("SaveDialog", args);
    },
    addOnSaveListener(callback) {
      ipcRenderer.on("SaveDialog", callback);
    },
    removeOnSaveListener(callback) {
      ipcRenderer.removeListener("SaveDialog", callback);
    },
  },
});
