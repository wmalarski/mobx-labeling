/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-location", () => {
  return {
    createMemoryHistory: jest.fn(),
    ReactLocation: class {},
    useMatch: jest.fn(() => ({ params: {} })),
    useSearch: jest.fn(),
    Link: ({ activeOptions, ...props }: any) => (
      <a {...props}>{props.children}</a>
    ),
  };
});

// export the mocked instance above
module.exports = jest.requireMock("react-location");
