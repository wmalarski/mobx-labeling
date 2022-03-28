import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { UseXZoomResult } from "../Timeline.utils";

type Props = {
  zoom: UseXZoomResult;
};

export const TimelineBar = ({ zoom }: Props): ReactElement => {
  const { t } = useTranslation("common");
  return (
    <div>
      <p>{t("TimelineBar")}</p>
      <div>{zoom.scaleX}</div>
    </div>
  );
};
