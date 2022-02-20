import { Link as NextUiLink } from "@nextui-org/react";
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
  styleProps?: ComponentPropsWithoutRef<typeof NextUiLink>;
}): ReactElement {
  return (
    <LocationLink {...props}>
      <NextUiLink {...styleProps}>{children}</NextUiLink>
    </LocationLink>
  );
}
