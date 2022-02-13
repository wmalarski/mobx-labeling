import { AriaListBoxOptions, useListBox } from "@react-aria/listbox";
import { ListState } from "@react-stately/list";
import { ReactElement, RefObject, useRef } from "react";
import * as Styles from "./ListBox.styles";
import { Option } from "./Option/Option";

type Props<T> = AriaListBoxOptions<T> & {
  state: ListState<T>;
  listBoxRef?: RefObject<HTMLUListElement>;
};

export function ListBox<T>({
  state,
  listBoxRef,
  ...props
}: Props<T>): ReactElement {
  const ref = useRef<HTMLUListElement>(null);
  const innerRef = listBoxRef ?? ref;

  const { listBoxProps } = useListBox(props, state, innerRef);

  return (
    <Styles.Ul {...listBoxProps} css={{}} ref={innerRef}>
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </Styles.Ul>
  );
}
