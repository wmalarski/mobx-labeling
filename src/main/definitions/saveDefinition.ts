import { ipcMain } from "electron";
import { IpcRendererChannel, ProjectDefinitionSnapshot } from "../types";

export const setupSaveDefinitionHandle = () => {
  ipcMain.handle(
    IpcRendererChannel.SaveDefinition,
    async (_event, arg: ProjectDefinitionSnapshot) => {
      const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
      console.log("SaveDefinition2", msgTemplate(arg.name));
    }
  );
};
