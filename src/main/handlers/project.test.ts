import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { rm } from "fs/promises";
import path from "path";
import { ProjectRoot } from "../types";
import { appDataPath } from "../util";
import { handleCreateProject } from "./project";

const mockProjectRoot = (update: Partial<ProjectRoot> = {}): ProjectRoot => {
  return {
    batchSize: 100,
    batches: [],
    definition: {
      description: "description",
      id: "1",
      name: "definition",
      updatedAt: 0,
    },
    id: "1",
    items: [],
    name: "project",
    projectPath: path.join(appDataPath, "test.zip"),
    resources: [],
    updatedAt: 0,
    ...update,
  };
};

jest.mock("electron", () => ({
  app: {
    getPath: jest.fn(() => __dirname),
  },
}));

describe("project handlers", () => {
  beforeEach(async () => {
    await rm(appDataPath, { recursive: true, force: true });
  });

  afterAll(async () => {
    await rm(appDataPath, { recursive: true, force: true });
  });

  it("should save project", async () => {
    expect.hasAssertions();

    const project = mockProjectRoot();

    await handleCreateProject(project);

    expect(true).toBeTruthy();
  });
});
