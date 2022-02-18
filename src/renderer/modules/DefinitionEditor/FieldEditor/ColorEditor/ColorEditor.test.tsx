import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { LineDefinition } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { ColorEditor } from "./ColorEditor";

type Props = ComponentProps<typeof ColorEditor>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    fieldDefinition: LineDefinition.create({
      name: "Name123",
    }),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <ColorEditor {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<ColorEditor />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    const fieldDefinition = LineDefinition.create({
      name: "Name123",
    });

    renderComponent({
      fieldDefinition,
    });

    const header = i18n.t<string>("figureHeader", { ns: "definition" });
    const label = i18n.t<string>("colorSliderLabel", { ns: "definition" });

    fireEvent.change(
      await screen.findByLabelText(label, { selector: "input" }),
      { target: { value: 25 } }
    );

    expect(fieldDefinition.color).toBe("hsl(25, 100%, 50%)");
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });
});
