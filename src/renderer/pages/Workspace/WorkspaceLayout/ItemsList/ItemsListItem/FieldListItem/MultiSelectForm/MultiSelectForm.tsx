import { Checkbox, Grid, Text } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { MultiSelectField } from "renderer/models";

type Props = {
  field: Instance<typeof MultiSelectField>;
};

export const MultiSelectForm = observer(({ field }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  const current = field.current;

  if (!current) {
    return <Text type="error">{t("invalidField")}</Text>;
  }

  const handleChange = (values: string[]) => {
    current.setValues(values);
  };

  return (
    <Checkbox.Group value={current.values} onChange={handleChange}>
      <Grid.Container gap={1} margin={0.5}>
        {field.definition.options.map((option) => (
          <Grid key={option.text} xs={option.size}>
            <Checkbox value={option.text}>{option.text}</Checkbox>
          </Grid>
        ))}
      </Grid.Container>
    </Checkbox.Group>
  );
});
