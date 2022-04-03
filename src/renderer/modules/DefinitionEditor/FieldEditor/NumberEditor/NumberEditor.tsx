import { Grid, Input, Text } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { NumberDefinition } from "renderer/models";

type Props = {
  fieldDefinition: Instance<typeof NumberDefinition>;
};

export const NumberEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
      fieldDefinition.setMin(event.target.valueAsNumber);
    };

    const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
      fieldDefinition.setMax(event.target.valueAsNumber);
    };

    const handleStepChange = (event: ChangeEvent<HTMLInputElement>) => {
      fieldDefinition.setStep(event.target.valueAsNumber);
    };

    const handleDefaultChange = (event: ChangeEvent<HTMLInputElement>) => {
      fieldDefinition.setDefault(event.target.valueAsNumber);
    };

    return (
      <Grid.Container gap={0.5}>
        <Grid xs={24}>
          <Text h5>{t("numberHeader")}</Text>
        </Grid>
        <Grid xs={24}>
          <Input
            htmlType="number"
            width="100%"
            aria-label={t("numberMin")}
            label={t("numberMin")}
            placeholder={t("numberMin")}
            value={String(fieldDefinition.min)}
            onChange={handleMinChange}
          />
        </Grid>
        <Grid xs={24}>
          <Input
            htmlType="number"
            width="100%"
            aria-label={t("numberMax")}
            label={t("numberMax")}
            placeholder={t("numberMax")}
            value={String(fieldDefinition.max)}
            onChange={handleMaxChange}
          />
        </Grid>
        <Grid xs={24}>
          <Input
            htmlType="number"
            width="100%"
            aria-label={t("numberStep")}
            label={t("numberStep")}
            placeholder={t("numberStep")}
            value={String(fieldDefinition.step)}
            onChange={handleStepChange}
          />
        </Grid>
        <Grid xs={24}>
          <Input
            htmlType="number"
            width="100%"
            aria-label={t("numberDefault")}
            label={t("numberDefault")}
            placeholder={t("numberDefault")}
            value={String(fieldDefinition.default)}
            onChange={handleDefaultChange}
          />
        </Grid>
      </Grid.Container>
    );
  }
);
