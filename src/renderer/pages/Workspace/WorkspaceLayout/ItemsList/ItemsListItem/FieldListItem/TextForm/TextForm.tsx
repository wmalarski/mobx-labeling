import { Input, Text } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { TextField } from "renderer/models";

type Props = {
  textField: Instance<typeof TextField>;
};

export const TextForm = observer(
  ({ textField }: Props): ReactElement | null => {
    const { t } = useTranslation("workspace");

    const current = textField.current;

    if (!current) {
      return <Text type="error">{t("invalidField")}</Text>;
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      current.setValue(event.target.value);
    };

    return (
      <Input
        value={current.value}
        onChange={handleChange}
        aria-label={textField.definition.name}
        placeholder={textField.definition.name}
        width="100%"
        clearable
      />
    );
  }
);
