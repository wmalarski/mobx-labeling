import { CssBaseline, GeistProvider } from "@geist-ui/core";
import { ReactElement, ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18next from "renderer/utils/i18next";

export type TestWrapperProps = {
  children?: ReactNode;
};

export type PropsWithTestWrapper<T = unknown> = T & {
  wrapperProps?: Omit<TestWrapperProps, "children">;
};

export const TestWrapper = ({ children }: TestWrapperProps): ReactElement => {
  return (
    <GeistProvider themeType="dark">
      <CssBaseline />
      <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
    </GeistProvider>
  );
};
