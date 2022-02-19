export type ProjectDefinitionSnapshot = {
  id: string;
  name: string;
  description: string;
  updatedAt: number;
};

export enum IpcRendererChannel {
  SaveDefinition = "SaveDefinition",
}
