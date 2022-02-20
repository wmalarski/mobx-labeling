import type {
  IpcRendererEvent,
  SaveDialogOptions,
  SaveDialogReturnValue,
} from "electron/renderer";
import { useEffect } from "react";
import { useCallbackRef } from "renderer/hooks";

type UseSaveDialogResult = {
  open: (options: SaveDialogOptions) => void;
};

type UseSaveDialogOptions = {
  onReturn: (value: SaveDialogReturnValue) => void;
};

export const useSaveDialog = ({
  onReturn,
}: UseSaveDialogOptions): UseSaveDialogResult => {
  const onReturnRef = useCallbackRef(onReturn);

  const open = (options: SaveDialogOptions) => {
    window.electron.ipcResources.saveDialog(options);
  };

  useEffect(() => {
    const listener = (
      _event: IpcRendererEvent,
      value: SaveDialogReturnValue
    ) => {
      onReturnRef(value);
    };
    window.electron.ipcResources.addOnSaveListener(listener);
    return () => {
      window.electron.ipcResources.removeOnSaveListener(listener);
    };
  }, [onReturnRef]);

  return { open };
};
