import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { access, mkdir, rm } from "fs/promises";
import os from "os";
import path from "path";
import { ProjectRoot } from "../types";
import { appDataPath } from "../util";
import {
  handleCreateProject,
  handleReadProject,
  recentListPath,
} from "./project";

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
    getPath: jest.fn(() => path.join(os.tmpdir(), "lab-tests")),
  },
}));

describe("project handlers", () => {
  beforeAll(async () => {
    await mkdir(appDataPath, { recursive: true });
  });

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

    await expect(access(project.projectPath)).resolves.toBeUndefined();
    await expect(access(recentListPath)).resolves.toBeUndefined();
  });

  it("should read project", async () => {
    expect.hasAssertions();

    const project = mockProjectRoot();

    await handleCreateProject(project);

    const result = await handleReadProject(project.projectPath);

    expect(result).toStrictEqual(project);
  });
});
