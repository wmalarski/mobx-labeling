import { Locale } from "@react-aria/i18n";

export const formatTime = (time: Date | number, locale: Locale): string => {
  const date = new Date(time);
  return new Intl.DateTimeFormat(locale.locale).format(date);
};
