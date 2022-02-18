import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { mockFieldDefinition, mockItemDefinition } from "renderer/utils/mocks";

describe("<ItemDefinition />", () => {
  it("should put field in correct place", async () => {
    expect.hasAssertions();

    const item = mockItemDefinition();
    const field = mockFieldDefinition({ update: { name: "Elo" } });

    item.putField(field, 2);

    expect(item.field(field.id)?.name).toBe("Elo");
    expect(item.fields[2].name).toBe("Elo");
  });

  it("should reorder fields", async () => {
    expect.hasAssertions();

    const item = mockItemDefinition();

    item.reorderFields(
      {
        droppableId: item.id,
        index: 0,
      },
      {
        droppableId: item.id,
        index: 2,
      }
    );

    expect(item.fields.map((field) => field.name.split(" ")[0])).toStrictEqual([
      "Field1",
      "Field2",
      "Field0",
      "Field3",
    ]);
  });
});
