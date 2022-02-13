import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { TextDefinition } from "renderer/models/fields/text";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { TextEditor } from "./TextEditor";

type Props = ComponentProps<typeof TextEditor>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    fieldDefinition: TextDefinition.create({ name: "Name123" }),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <TextEditor {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<TextEditor />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("textHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should change default value", async () => {
    expect.hasAssertions();

    const fieldDefinition = TextDefinition.create({ name: "Name123" });

    renderComponent({ fieldDefinition });

    const label = i18n.t<string>("textSize", { ns: "definition" });
    const field = await screen.findByLabelText(label);

    userEvent.clear(field);
    userEvent.type(field, "hello");

    expect(fieldDefinition.default).toBe("hello");
  });
});
