import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { getSnapshot } from "mobx-state-tree";
import { DefinitionNodeKind } from "renderer/models";
import { mockProjectDefinition } from "renderer/tests/mocks";

describe("<ProjectDefinition />", () => {
  it("should not reorder when source is equal to target", async () => {
    expect.hasAssertions();

    const projectDefinition = mockProjectDefinition();
    const itemDefinition = projectDefinition.items[0];
    const before = getSnapshot(projectDefinition);

    projectDefinition.reorder({
      draggableId: projectDefinition.id,
      mode: "FLUID",
      reason: "DROP",
      source: {
        droppableId: itemDefinition.id,
        index: 1,
      },
      type: DefinitionNodeKind.Field,
      destination: {
        droppableId: itemDefinition.id,
        index: 1,
      },
    });

    const after = getSnapshot(projectDefinition);
    expect(after).toStrictEqual(before);
  });

  it("should reorder of fields in same item", async () => {
    expect.hasAssertions();

    const projectDefinition = mockProjectDefinition();
    const itemDefinition = projectDefinition.items[0];

    projectDefinition.reorder({
      draggableId: projectDefinition.id,
      mode: "FLUID",
      reason: "DROP",
      source: {
        droppableId: itemDefinition.id,
        index: 1,
      },
      type: DefinitionNodeKind.Field,
      destination: {
        droppableId: itemDefinition.id,
        index: 2,
      },
    });

    const names = itemDefinition.fields.map(
      (field) => field.name.split(" ")[0]
    );
    expect(names).toStrictEqual(["Field0", "Field2", "Field1", "Field3"]);
  });

  it("should reorder of fields in different items", async () => {
    expect.hasAssertions();

    const projectDefinition = mockProjectDefinition();
    const firstItemDefinition = projectDefinition.items[0];
    const secondItemDefinition = projectDefinition.items[1];

    projectDefinition.reorder({
      draggableId: projectDefinition.id,
      mode: "FLUID",
      reason: "DROP",
      source: {
        droppableId: firstItemDefinition.id,
        index: 1,
      },
      type: DefinitionNodeKind.Field,
      destination: {
        droppableId: secondItemDefinition.id,
        index: 2,
      },
    });

    const firstNames = firstItemDefinition.fields.map(
      (field) => field.name.split(" ")[0]
    );
    const secondNames = secondItemDefinition.fields.map(
      (field) => field.name.split(" ")[0]
    );

    expect(firstNames).toStrictEqual(["Field0", "Field2", "Field3"]);
    expect(secondNames).toStrictEqual([
      "Field0",
      "Field1",
      "Field1",
      "Field2",
      "Field3",
    ]);
  });

  it("should not reorder when source is invalid", async () => {
    expect.hasAssertions();

    const projectDefinition = mockProjectDefinition();
    const itemDefinition = projectDefinition.items[0];
    const before = getSnapshot(projectDefinition);

    projectDefinition.reorder({
      draggableId: projectDefinition.id,
      mode: "FLUID",
      reason: "DROP",
      source: {
        droppableId: "yol",
        index: 1,
      },
      type: DefinitionNodeKind.Field,
      destination: {
        droppableId: itemDefinition.id,
        index: 1,
      },
    });

    const after = getSnapshot(projectDefinition);
    expect(after).toStrictEqual(before);
  });

  it("should not reorder when destination is invalid", async () => {
    expect.hasAssertions();

    const projectDefinition = mockProjectDefinition();
    const itemDefinition = projectDefinition.items[0];
    const before = getSnapshot(projectDefinition);

    projectDefinition.reorder({
      draggableId: projectDefinition.id,
      mode: "FLUID",
      reason: "DROP",
      source: {
        droppableId: itemDefinition.id,
        index: 1,
      },
      type: DefinitionNodeKind.Field,
      destination: {
        droppableId: "yol",
        index: 1,
      },
    });

    const after = getSnapshot(projectDefinition);
    expect(after).toStrictEqual(before);
  });
});
