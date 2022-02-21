import {
  Button,
  StyledInput,
  StyledInputContainer,
  StyledInputLabel,
  StyledInputMainContainer,
  StyledInputWrapper,
} from "@nextui-org/react";
import { useButton } from "@react-aria/button";
import { useComboBox } from "@react-aria/combobox";
import { useFilter } from "@react-aria/i18n";
import { ComboBoxStateProps, useComboBoxState } from "@react-stately/combobox";
import { ReactElement, useCallback, useRef } from "react";
import { ListBox } from "../ListBox/ListBox";
import { Popover } from "../Popover/Popover";
import * as Styles from "./ComboBox.styles";

export function ComboBox<T extends object>(
  props: ComboBoxStateProps<T>
): ReactElement {
  const filter = useFilter({ sensitivity: "base" });
  const defaultFilter = useCallback(
    (textValue: string, inputValue: string): boolean =>
      filter.contains(textValue, inputValue),
    [filter]
  );
  const state = useComboBoxState({ ...props, defaultFilter });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const {
    buttonProps: triggerProps,
    inputProps,
    listBoxProps,
    labelProps,
  } = useComboBox(
    {
      ...props,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state
  );

  const { buttonProps } = useButton(triggerProps, buttonRef);

  const handlePopoverClose = () => {
    state.close();
  };

  return (
    <Styles.Container css={{ width: "100%" }}>
      <StyledInputMainContainer size="md" css={{ width: "100%" }}>
        <StyledInputContainer animated isTextarea={false} underlined={false}>
          <StyledInputWrapper
            as="label"
            animated
            isTextarea={false}
            underlined={false}
          >
            <StyledInputLabel
              {...labelProps}
              css={{}}
              isDefaultStatus={true}
              isDark={true}
              isRight={false}
              bordered={false}
              underlined={false}
            >
              {props.label}
            </StyledInputLabel>
            <StyledInput animated {...inputProps} css={{}} ref={inputRef} />
            <Button auto light {...buttonProps} ref={buttonRef}>
              <span aria-hidden="true">▼</span>
            </Button>
          </StyledInputWrapper>
        </StyledInputContainer>
      </StyledInputMainContainer>
      {state.isOpen && (
        <Popover
          popoverRef={popoverRef}
          isOpen={state.isOpen}
          onClose={handlePopoverClose}
        >
          <ListBox {...listBoxProps} listBoxRef={listBoxRef} state={state} />
        </Popover>
      )}
    </Styles.Container>
  );
}
