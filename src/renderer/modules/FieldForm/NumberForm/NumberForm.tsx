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
      aria-label={field.definition.name}
      clearable
      disabled={field.blocked}
      htmlType="number"
      max={field.definition.max}
      min={field.definition.min}
      onChange={handleChange}
      placeholder={field.definition.name}
      step={field.definition.step}
      value={String(current.value)}
      width="100%"
    />
  );
});
