import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { SnapshotIn, types } from "mobx-state-tree";
import { Box3dDefinition, Box3dField, CurrentFrame } from "renderer/models";

const Model = types.model({
  currentFrame: CurrentFrame,
  definition: Box3dDefinition,
  field: Box3dField,
});

const createInstance = ({
  definition,
  field,
}: {
  definition?: Partial<SnapshotIn<typeof Box3dDefinition>>;
  field?: Partial<SnapshotIn<typeof Box3dField>>;
} = {}) => {
  return Model.create({
    currentFrame: CurrentFrame.create({}),
    definition: { id: "id", kind: "Box3d", name: "Box3d", ...definition },
    field: {
      currentFrame: "id",
      definition: "id",
      id: "1",
      kind: "Box3d",
      values: {
        "0": {
          front: [0, 0, 0, 100, 100, 100, 100, 0],
          sideType: "None",
        },
      },
      ...field,
    },
  });
};

describe("<FieldRow />", () => {
  it("should calculate singleton value", async () => {
    expect.hasAssertions();

    const instance = createInstance({
      definition: { change: "Singleton" },
    });

    const field = instance.field;
  });
});
