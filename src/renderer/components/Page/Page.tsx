import { ReactElement, ReactNode } from "react";
import * as Styles from "./Page.styles";

type Props = {
  children: ReactNode;
};

export const Page = ({ children }: Props): ReactElement => {
  return <Styles.Container>{children}</Styles.Container>;
};
