import { Text, Toggle } from "@geist-ui/core";
import { ToggleEvent } from "@geist-ui/core/esm/toggle";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { CheckBoxField } from "renderer/models";

type Props = {
  field: Instance<typeof CheckBoxField>;
};

export const CheckBoxForm = observer(({ field }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  const current = field.current;

  if (!current) {
    return <Text type="error">{t("invalidField")}</Text>;
  }

  const handleFromChange = (event: ToggleEvent) => {
    current.setValue(event.target.checked);
  };

  return (
    <Toggle
      aria-label={field.definition.name}
      checked={current.value}
      onChange={handleFromChange}
    />
  );
});
