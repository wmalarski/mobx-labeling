/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-location", () => {
  const mockNavigate = jest.fn();
  return {
    createMemoryHistory: jest.fn(),
    ReactLocation: class {},
    useMatch: jest.fn(() => ({ params: {}, data: {} })),
    useSearch: jest.fn(),
    useNavigate: jest.fn(() => mockNavigate),
    mockNavigate,
    Link: ({ activeOptions, ...props }: any) => (
      <a {...props}>{props.children}</a>
    ),
    Router: ({ location, routes, ...props }: any) => <div {...props} />,
  };
});

// export the mocked instance above
module.exports = jest.requireMock("react-location");
