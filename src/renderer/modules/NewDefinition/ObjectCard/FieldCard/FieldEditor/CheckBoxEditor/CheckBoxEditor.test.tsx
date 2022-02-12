import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { CheckBoxDefinition } from "renderer/models/fields/checkBox";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { CheckBoxEditor } from "./CheckBoxEditor";

type Props = ComponentProps<typeof CheckBoxEditor>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    fieldDefinition: CheckBoxDefinition.create({
      name: "Name123",
    }),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <CheckBoxEditor {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<CheckBoxEditor />", () => {
  it("should render and toggle default value true", async () => {
    expect.hasAssertions();

    const fieldDefinition = CheckBoxDefinition.create({
      name: "Name123",
      default: false,
    });

    renderComponent({
      fieldDefinition,
    });

    const text = i18n.t<string>("checkboxDefaultFalse", {
      ns: "definition",
    });

    await expect(screen.findByText(text)).resolves.toBeInTheDocument();

    userEvent.click(await screen.findByText(text));

    expect(fieldDefinition.default).toBeTruthy();
  });

  it("should render and toggle default value false", async () => {
    expect.hasAssertions();

    const fieldDefinition = CheckBoxDefinition.create({
      name: "Name123",
      default: true,
    });

    renderComponent({
      fieldDefinition,
    });

    const text = i18n.t<string>("checkboxDefaultTrue", {
      ns: "definition",
    });

    await expect(screen.findByText(text)).resolves.toBeInTheDocument();

    userEvent.click(await screen.findByText(text));

    expect(fieldDefinition.default).toBeFalsy();
  });
});
