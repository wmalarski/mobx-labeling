import { Checkbox, Grid, Text } from "@geist-ui/core";
import { CheckboxEvent } from "@geist-ui/core/esm/checkbox";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { CheckBoxDefinition } from "renderer/models";

type Props = {
  fieldDefinition: Instance<typeof CheckBoxDefinition>;
};

export const CheckBoxEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handleChange = (event: CheckboxEvent) => {
      fieldDefinition.setDefault(event.target.checked);
    };

    return (
      <Grid.Container gap={1}>
        <Grid xs={24}>
          <Text h5>{t("checkboxHeader")}</Text>
        </Grid>
        <Grid xs={24}>
          <Checkbox checked={fieldDefinition.default} onChange={handleChange}>
            {fieldDefinition.default
              ? t("checkboxDefaultTrue")
              : t("checkboxDefaultFalse")}
          </Checkbox>
        </Grid>
      </Grid.Container>
    );
  }
);
