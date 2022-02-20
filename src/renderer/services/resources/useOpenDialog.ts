import type {
  IpcRendererEvent,
  OpenDialogOptions,
  OpenDialogReturnValue,
} from "electron/renderer";
import { useEffect } from "react";
import { useCallbackRef } from "renderer/hooks";

type UseOpenDialogResult = {
  open: (options: OpenDialogOptions) => void;
};

type UseOpenDialogOptions = {
  onReturn: (value: OpenDialogReturnValue) => void;
};

export const useOpenDialog = ({
  onReturn,
}: UseOpenDialogOptions): UseOpenDialogResult => {
  const onReturnRef = useCallbackRef(onReturn);

  const open = (options: OpenDialogOptions) => {
    window.electron.ipcResources.openDialog(options);
  };

  useEffect(() => {
    const listener = (
      _event: IpcRendererEvent,
      value: OpenDialogReturnValue
    ) => {
      onReturnRef(value);
    };
    window.electron.ipcResources.addOnOpenListener(listener);
    return () => {
      window.electron.ipcResources.removeOnOpenListener(listener);
    };
  }, [onReturnRef]);

  return { open };
};
