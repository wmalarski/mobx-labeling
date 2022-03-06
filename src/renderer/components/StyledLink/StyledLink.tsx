import { ReactElement } from "react";
import {
  DefaultGenerics,
  Link as LocationLink,
  LinkProps,
} from "react-location";

export function StyledLink<TGenerics = DefaultGenerics>({
  children,
  ...props
}: LinkProps<TGenerics>): ReactElement {
  return <LocationLink {...props}>{children}</LocationLink>;
}
