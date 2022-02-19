import { app, ipcMain } from "electron";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { IpcRendererChannel, ProjectDefinitionSnapshot } from "../types";

const appDataPath = path.join(app.getPath("userData"), "MobXLabeling");
const definitionsListPath = path.join(appDataPath, "definitions.json");

const makeDefinitionsDir = async (): Promise<void> => {
  try {
    await mkdir(appDataPath);
  } catch (err) {
    // Ignore already exists error
  }
};

const readDefinitionsList = async (): Promise<ProjectDefinitionSnapshot[]> => {
  try {
    const data = await readFile(definitionsListPath);
    return JSON.parse(data.toString());
  } catch (err) {
    // TODO: Send error message to renderer
    return [];
  }
};

const writeDefinitionsList = async (
  data: ProjectDefinitionSnapshot[]
): Promise<void> => {
  console.log("save", { data });
  try {
    const json = JSON.stringify(data);
    await writeFile(definitionsListPath, json);
  } catch (err) {
    // TODO: Send error message to renderer
    console.error(err);
  }
};

export const setupSaveDefinitionHandle = () => {
  ipcMain.handle(
    IpcRendererChannel.SaveDefinition,
    async (_event, arg: ProjectDefinitionSnapshot) => {
      const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;

      await makeDefinitionsDir();

      const previousList = await readDefinitionsList();

      await writeDefinitionsList([
        ...previousList,
        {
          description: arg.description,
          id: arg.id,
          name: arg.name,
          updatedAt: arg.updatedAt,
        },
      ]);

      console.log("SaveDefinition2", msgTemplate(arg.name), previousList);
    }
  );
};
