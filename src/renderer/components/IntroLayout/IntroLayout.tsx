import { Page } from "@geist-ui/core";
import { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const IntroLayout = ({ children }: Props): ReactElement => {
  return (
    <Page dotBackdrop dotSize="5px" style={{ color: "white" }}>
      {children}
    </Page>
  );
};
