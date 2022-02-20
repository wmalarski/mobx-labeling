import { IpcDefinitionsService, IpcResourcesService } from "renderer/services";

export {};

declare global {
  interface Window {
    electron: {
      ipcDefinitions: IpcDefinitionsService;
      ipcResources: IpcResourcesService;
    };
  }
}
