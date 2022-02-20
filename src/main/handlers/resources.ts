import { dialog, ipcMain, OpenDialogOptions } from "electron";
import { IpcRendererChannel } from "../types";

export const setupResourcesHandles = () => {
  ipcMain.on(
    IpcRendererChannel.OpenDialog,
    async (event, args: OpenDialogOptions): Promise<void> => {
      const result = await dialog.showOpenDialog(args);
      event.reply(IpcRendererChannel.OpenDialog, result);
    }
  );
};
