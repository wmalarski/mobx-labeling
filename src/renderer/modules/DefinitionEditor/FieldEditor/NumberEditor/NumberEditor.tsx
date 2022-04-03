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
            aria-label={t("numberMin")}
            htmlType="number"
            label={t("numberMin")}
            onChange={handleMinChange}
            placeholder={t("numberMin")}
            value={String(fieldDefinition.min)}
            width="100%"
          />
        </Grid>
        <Grid xs={24}>
          <Input
            aria-label={t("numberMax")}
            htmlType="number"
            label={t("numberMax")}
            onChange={handleMaxChange}
            placeholder={t("numberMax")}
            value={String(fieldDefinition.max)}
            width="100%"
          />
        </Grid>
        <Grid xs={24}>
          <Input
            aria-label={t("numberStep")}
            htmlType="number"
            label={t("numberStep")}
            onChange={handleStepChange}
            placeholder={t("numberStep")}
            value={String(fieldDefinition.step)}
            width="100%"
          />
        </Grid>
        <Grid xs={24}>
          <Input
            aria-label={t("numberDefault")}
            htmlType="number"
            label={t("numberDefault")}
            onChange={handleDefaultChange}
            placeholder={t("numberDefault")}
            value={String(fieldDefinition.default)}
            width="100%"
          />
        </Grid>
      </Grid.Container>
    );
  }
);
