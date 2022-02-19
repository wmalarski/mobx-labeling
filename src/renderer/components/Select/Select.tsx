import { Button } from "@nextui-org/react";
import { useButton } from "@react-aria/button";
import { AriaSelectOptions, HiddenSelect, useSelect } from "@react-aria/select";
import { useSelectState } from "@react-stately/select";
import { SelectProps } from "@react-types/select";
import { ReactElement, useRef } from "react";
import { ListBox } from "../ListBox/ListBox";
import { Popover } from "../Popover/Popover";
import * as Styles from "./Select.styles";

type Props<T> = SelectProps<T> & AriaSelectOptions<T>;

export function Select<T extends object>(props: Props<T>): ReactElement {
  const ref = useRef<HTMLButtonElement>(null);

  const state = useSelectState<T>(props);
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  );

  const { buttonProps } = useButton(triggerProps, ref);

  const handlePopoverClose = () => {
    state.close();
  };

  return (
    <Styles.Container>
      <div {...labelProps}>{props.label}</div>
      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <Button {...buttonProps} ref={ref} color="secondary">
        <span {...valueProps}>
          {state.selectedItem
            ? state.selectedItem.rendered
            : props.placeholder ?? ""}
        </span>
        <Styles.Open aria-hidden="true">▼</Styles.Open>
      </Button>
      {state.isOpen && (
        <Popover
          isOpen={state.isOpen}
          onClose={handlePopoverClose}
          shouldCloseOnBlur
          isDismissable
        >
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </Styles.Container>
  );
}
