import { IpcDefinitionsService } from "renderer/services/types";

export {};

declare global {
  interface Window {
    electron: {
      ipcDefinitions: IpcDefinitionsService;
    };
  }
}
