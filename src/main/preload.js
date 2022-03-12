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
  ipcProject: {
    async createProject(project) {
      return ipcRenderer.invoke("CreateProject", project);
    },
    async readProject(projectPath) {
      return ipcRenderer.invoke("ReadProject", projectPath);
    },
    async readBatch({ projectPath, batchId }) {
      return ipcRenderer.invoke("ReadBatch", projectPath, batchId);
    },
    async updateBatch({ projectPath, batchId, batchData }) {
      return ipcRenderer.invoke("UpdateBatch", projectPath, batchId, batchData);
    },
    async readProjects({ start, limit, query }) {
      return ipcRenderer.invoke("ReadProjects", { start, limit, query });
    },
  },
});
