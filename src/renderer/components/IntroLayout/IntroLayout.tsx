import { Container } from "@nextui-org/react";
import { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const IntroLayout = ({ children }: Props): ReactElement => {
  return <Container md>{children}</Container>;
};
