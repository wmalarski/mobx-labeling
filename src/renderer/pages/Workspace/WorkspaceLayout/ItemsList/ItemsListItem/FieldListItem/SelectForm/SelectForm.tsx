import { Grid, Radio, Text } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { SelectField } from "renderer/models";

type Props = {
  selectField: Instance<typeof SelectField>;
};

export const SelectForm = observer(({ selectField }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  const current = selectField.current;

  if (!current) {
    return <Text type="error">{t("invalidField")}</Text>;
  }

  const handleChange = (value: string | number) => {
    current.setValue(value as string);
  };

  return (
    <Radio.Group value={current.value} onChange={handleChange}>
      <Grid.Container gap={1}>
        {selectField.definition.options.map((option) => (
          <Grid key={option.text} xs={option.size}>
            <Radio value={option.text}>{option.text}</Radio>
          </Grid>
        ))}
      </Grid.Container>
    </Radio.Group>
  );
});
