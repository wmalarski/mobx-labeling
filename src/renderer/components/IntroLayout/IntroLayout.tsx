import { Page } from "@geist-ui/core";
import { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const IntroLayout = ({ children }: Props): ReactElement => {
  return <Page>{children}</Page>;
};
