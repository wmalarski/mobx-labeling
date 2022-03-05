import { Link as GeistUiLink } from "@geist-ui/core";
import { ComponentPropsWithoutRef, ReactElement } from "react";
import {
  DefaultGenerics,
  Link as LocationLink,
  LinkProps,
} from "react-location";

export function StyledLink<TGenerics = DefaultGenerics>({
  children,
  styleProps,
  ...props
}: LinkProps<TGenerics> & {
  styleProps?: ComponentPropsWithoutRef<typeof GeistUiLink>;
}): ReactElement {
  return (
    <LocationLink {...props}>
      <GeistUiLink {...styleProps}>{children}</GeistUiLink>
    </LocationLink>
  );
}
