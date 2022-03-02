import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { NewProjectStore } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { ProjectDetails } from "./ProjectDetails";

type Props = ComponentProps<typeof ProjectDetails>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    newProjectStore: NewProjectStore.create({
      definitions: {},
      name: "Name",
    }),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <ProjectDetails {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<ProjectDetails />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("batchSizePlaceholder", { ns: "project" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });
});
