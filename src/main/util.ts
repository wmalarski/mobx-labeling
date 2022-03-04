import { app } from "electron";
import { mkdir } from "fs/promises";
import path from "path";
import { URL } from "url";

export let resolveHtmlPath: (htmlFileName: string) => string;

if (process.env.NODE_ENV === "development") {
  const port = process.env.PORT || 1212;
  resolveHtmlPath = (htmlFileName: string) => {
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  };
} else {
  resolveHtmlPath = (htmlFileName: string) => {
    return `file://${path.resolve(__dirname, "../renderer/", htmlFileName)}`;
  };
}

export const appDataPath = path.join(app.getPath("userData"), "MobXLabeling");

export const makeDefinitionsDir = async (): Promise<void> => {
  try {
    await mkdir(appDataPath);
  } catch (err) {
    // Ignore already exists error
  }
};
