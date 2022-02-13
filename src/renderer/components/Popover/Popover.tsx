import { FocusScope } from "@react-aria/focus";
import { DismissButton, OverlayProps, useOverlay } from "@react-aria/overlays";
import { ReactNode, RefObject, useRef } from "react";
import * as Styles from "./Popover.styles";

type Props = OverlayProps & {
  popoverRef?: RefObject<HTMLDivElement>;
  children: ReactNode;
};

export const Popover = ({ popoverRef, children, onClose, ...props }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = popoverRef ?? ref;

  const { overlayProps } = useOverlay({ onClose, ...props }, innerRef);

  return (
    <FocusScope restoreFocus>
      <Styles.Container {...overlayProps} css={{}} ref={innerRef}>
        {children}
        <DismissButton onDismiss={onClose} />
      </Styles.Container>
    </FocusScope>
  );
};
