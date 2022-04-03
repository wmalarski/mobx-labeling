import { Input, Text } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { TextField } from "renderer/models";

type Props = {
  field: Instance<typeof TextField>;
};

export const TextForm = observer(({ field }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  const current = field.current;

  if (!current) {
    return <Text type="error">{t("invalidField")}</Text>;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    current.setValue(event.target.value);
  };

  return (
    <Input
      aria-label={field.definition.name}
      clearable
      disabled={field.blocked}
      onChange={handleChange}
      placeholder={field.definition.name}
      value={current.value}
      width="100%"
    />
  );
});
