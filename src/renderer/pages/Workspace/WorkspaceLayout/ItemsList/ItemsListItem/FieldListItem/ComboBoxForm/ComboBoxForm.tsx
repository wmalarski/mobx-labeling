import { Select, Text } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ComboBoxField } from "renderer/models";

type Props = {
  field: Instance<typeof ComboBoxField>;
};

export const ComboBoxForm = observer(({ field }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  const current = field.current;

  if (!current) {
    return <Text type="error">{t("invalidField")}</Text>;
  }

  const handleFromChange = (newValue: string | string[]) => {
    current.setValue(String(newValue));
  };

  return (
    <Select
      width="100%"
      placeholder={field.definition.name}
      aria-label={field.definition.name}
      value={current.value}
      onChange={handleFromChange}
    >
      {field.definition.options.map((option) => (
        <Select.Option key={option} value={option}>
          {option}
        </Select.Option>
      ))}
    </Select>
  );
});
