import { AriaOptionProps, useOption } from "@react-aria/listbox";
import { ListState } from "@react-stately/list";
import { Node } from "@react-types/shared";
import { ReactElement, useRef } from "react";
import * as Styles from "./Option.styles";

type Props<T> = AriaOptionProps & {
  item: Node<T>;
  state: ListState<T>;
};

export function Option<T>({ state, item, ...props }: Props<T>): ReactElement {
  const ref = useRef<HTMLLIElement>(null);

  const { optionProps, isSelected, isFocused, isDisabled } = useOption(
    { ...props, key: item.key },
    state,
    ref
  );

  return (
    <Styles.Li
      {...optionProps}
      css={{}}
      ref={ref}
      isSelected={isSelected}
      isFocused={isFocused}
      isDisabled={isDisabled}
    >
      {item.rendered}
    </Styles.Li>
  );
}
