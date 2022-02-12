import { NextUIProvider } from "@nextui-org/react";
import { ReactElement, ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { darkTheme } from "renderer/styles/config";
import i18next from "renderer/utils/i18next";

export type TestWrapperProps = {
  children?: ReactNode;
};

export type PropsWithTestWrapper<T = unknown> = T & {
  wrapperProps?: Omit<TestWrapperProps, "children">;
};

export const TestWrapper = ({ children }: TestWrapperProps): ReactElement => {
  return (
    <NextUIProvider theme={darkTheme}>
      <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
    </NextUIProvider>
  );
};
