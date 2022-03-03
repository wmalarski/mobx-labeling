import { ElectronServices } from "renderer/services";

export {};

declare global {
  interface Window {
    electron: ElectronServices;
  }
}
