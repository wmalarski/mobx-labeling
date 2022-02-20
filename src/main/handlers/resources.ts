import {
  dialog,
  ipcMain,
  OpenDialogOptions,
  SaveDialogOptions,
} from "electron";
import { IpcRendererChannel } from "../types";

export const setupResourcesHandles = () => {
  ipcMain.on(
    IpcRendererChannel.OpenDialog,
    async (event, args: OpenDialogOptions): Promise<void> => {
      const result = await dialog.showOpenDialog(args);
      event.reply(IpcRendererChannel.OpenDialog, result);
    }
  );
  ipcMain.on(
    IpcRendererChannel.SaveDialog,
    async (event, args: SaveDialogOptions): Promise<void> => {
      const result = await dialog.showSaveDialog(args);
      event.reply(IpcRendererChannel.SaveDialog, result);
    }
  );
};
