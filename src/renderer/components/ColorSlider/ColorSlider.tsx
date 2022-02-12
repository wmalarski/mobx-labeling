import { useColorSlider } from "@react-aria/color";
import { useFocusRing } from "@react-aria/focus";
import { useLocale } from "@react-aria/i18n";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import {
  ColorSliderStateOptions,
  useColorSliderState,
} from "@react-stately/color";
import { ReactElement, useRef } from "react";
import * as Styles from "./ColorSlider.styles";

export const ColorSlider = (
  props: Omit<ColorSliderStateOptions, "locale">
): ReactElement => {
  const { locale } = useLocale();
  const state = useColorSliderState({ ...props, locale });
  const trackRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const channelName = state.value.getChannelName(props.channel, locale);
  const label = props.label ?? channelName;

  const { trackProps, thumbProps, inputProps, labelProps, outputProps } =
    useColorSlider({ ...props, label, trackRef, inputRef }, state);

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <Styles.Container>
      <Styles.Content>
        <label {...labelProps}>{label}</label>
        <Styles.Output {...outputProps} css={{}}>
          {state.value.formatChannelValue(props.channel, locale)}
        </Styles.Output>
      </Styles.Content>
      <Styles.Track
        {...trackProps}
        css={{}}
        ref={trackRef}
        style={trackProps.style}
      >
        <Styles.Thumb
          isFocusVisible={isFocusVisible}
          {...thumbProps}
          style={thumbProps.style}
          css={{ background: state.getDisplayColor().toString("css") }}
        >
          <VisuallyHidden>
            <input ref={inputRef} {...inputProps} {...focusProps} />
          </VisuallyHidden>
        </Styles.Thumb>
      </Styles.Track>
    </Styles.Container>
  );
};
