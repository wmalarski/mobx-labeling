import { Grid, Input, Text } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { TextDefinition } from "renderer/models";

type Props = {
  fieldDefinition: Instance<typeof TextDefinition>;
};

export const TextEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handleDefaultChange = (event: ChangeEvent<HTMLInputElement>) => {
      fieldDefinition.setDefault(event.target.value);
    };

    return (
      <Grid.Container gap={1}>
        <Grid xs={24}>
          <Text h5>{t("textHeader")}</Text>
        </Grid>
        <Grid xs={24}>
          <Input
            width="100%"
            aria-label={t("textDefault")}
            label={t("textDefault")}
            placeholder={t("textDefault")}
            value={fieldDefinition.default}
            onChange={handleDefaultChange}
          />
        </Grid>
      </Grid.Container>
    );
  }
);
