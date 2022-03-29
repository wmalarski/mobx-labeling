import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Rect } from "react-konva";
import { Field } from "renderer/models";

type Props = {
  field: Instance<typeof Field>;
  position: number;
};

export const FieldRow = observer(({ field, position }: Props): ReactElement => {
  const { t } = useTranslation("common");
  return <Rect></Rect>;
});
