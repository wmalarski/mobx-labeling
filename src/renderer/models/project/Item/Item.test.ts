import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { getSnapshot } from "mobx-state-tree";
import { mockItem } from "renderer/tests/mocks";

describe("<Item />", () => {
  it("should add independent frames", async () => {
    expect.hasAssertions();

    const item = mockItem({ framesCount: 0 });

    expect(getSnapshot(item?.ranges)).toStrictEqual([{ start: 0, end: 0 }]);

    item.currentFrame.setFrame(100);
    item.addCurrentFrame();

    expect(getSnapshot(item?.ranges)).toStrictEqual([
      { start: 0, end: 0 },
      { start: 100, end: 100 },
    ]);
  });

  it("should add frame from left", async () => {
    expect.hasAssertions();

    const item = mockItem({ framesCount: 0 });

    expect(getSnapshot(item?.ranges)).toStrictEqual([{ start: 0, end: 0 }]);

    item.currentFrame.setFrame(-1);
    item.addCurrentFrame();

    expect(getSnapshot(item?.ranges)).toStrictEqual([{ start: -1, end: 0 }]);
  });

  it("should add frame from right", async () => {
    expect.hasAssertions();

    const item = mockItem({ framesCount: 0 });

    expect(getSnapshot(item?.ranges)).toStrictEqual([{ start: 0, end: 0 }]);

    item.currentFrame.setFrame(1);
    item.addCurrentFrame();

    expect(getSnapshot(item?.ranges)).toStrictEqual([{ start: 0, end: 1 }]);
  });

  it("should merge two ranges", async () => {
    expect.hasAssertions();

    const item = mockItem({ framesCount: 0 });

    expect(getSnapshot(item?.ranges)).toStrictEqual([{ start: 0, end: 0 }]);

    item.currentFrame.setFrame(2);
    item.addCurrentFrame();

    expect(getSnapshot(item?.ranges)).toStrictEqual([
      { start: 0, end: 0 },
      { start: 2, end: 2 },
    ]);

    item.currentFrame.setFrame(1);
    item.addCurrentFrame();

    expect(getSnapshot(item?.ranges)).toStrictEqual([{ start: 0, end: 2 }]);
  });
});
