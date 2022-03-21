import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

jest.mock("canvas", () => {
  return {};
});

module.exports = jest.requireMock("canvas");
