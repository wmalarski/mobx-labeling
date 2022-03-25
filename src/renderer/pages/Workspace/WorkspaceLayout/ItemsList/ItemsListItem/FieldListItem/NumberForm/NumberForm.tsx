import { Input, Text } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { NumberField } from "renderer/models";

type Props = {
  field: Instance<typeof NumberField>;
};

export const NumberForm = observer(({ field }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  const current = field.current;

  if (!current) {
    return <Text type="error">{t("invalidField")}</Text>;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    current.setValue(value);
  };

  return (
    <Input
      value={String(current.value)}
      htmlType="number"
      onChange={handleChange}
      aria-label={field.definition.name}
      placeholder={field.definition.name}
      step={field.definition.step}
      min={field.definition.min}
      max={field.definition.max}
      width="100%"
      clearable
    />
  );
});
