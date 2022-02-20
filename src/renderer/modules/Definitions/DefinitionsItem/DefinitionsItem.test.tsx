import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { mockDefinitionEntry } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { routePaths } from "renderer/utils/routes";
import { DefinitionsItem } from "./DefinitionsItem";

type Props = ComponentProps<typeof DefinitionsItem>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    definitionEntry: mockDefinitionEntry(),
    onRemoveClick: () => void 0,
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <DefinitionsItem {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<DefinitionsItem />", () => {
  beforeEach(() => {
    jest.requireMock("react-location").mockNavigate.mockReset();
  });

  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("namePlaceholder", { ns: "definition" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should navigate to new project after click", async () => {
    expect.hasAssertions();

    const definitionEntry = mockDefinitionEntry();
    const mockNavigate = jest.requireMock("react-location").mockNavigate;

    renderComponent({ definitionEntry });

    const text = i18n.t<string>("useDefinition", { ns: "definition" });
    userEvent.click(await screen.findByText(text));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith({
      search: {
        definitionId: definitionEntry.id,
      },
      to: routePaths.newProject,
    });
  });

  it("should navigate to edit definition after click", async () => {
    expect.hasAssertions();

    const definitionEntry = mockDefinitionEntry({
      update: { description: "elo" },
    });
    const mockNavigate = jest.requireMock("react-location").mockNavigate;

    renderComponent({ definitionEntry });

    const text = i18n.t<string>("editDefinition", { ns: "definition" });
    userEvent.click(await screen.findByText(text));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith({
      to: routePaths.definition(definitionEntry.id),
    });
  });
});
