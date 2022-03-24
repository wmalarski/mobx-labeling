import { Grid, Input, Text } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { RectangleField } from "renderer/models";

type Props = {
  rectangleField: Instance<typeof RectangleField>;
};

export const RectangleForm = observer(
  ({ rectangleField }: Props): ReactElement => {
    const { t } = useTranslation("workspace");

    const current = rectangleField.current;

    if (!current) {
      return <Text type="error">{t("invalidField")}</Text>;
    }

    const handleChange =
      (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        current.updateValue(index, value);
      };

    return (
      <Grid.Container gap={1}>
        <Grid xs={24}>
          <Input
            width="100%"
            htmlType="number"
            placeholder={t("rectangleTop")}
            label={t("rectangleTop")}
            aria-label={t("rectangleTop")}
            value={String(current.value[0])}
            onChange={handleChange(0)}
          />
        </Grid>
        <Grid xs={24}>
          <Input
            width="100%"
            htmlType="number"
            placeholder={t("rectangleLeft")}
            label={t("rectangleLeft")}
            aria-label={t("rectangleLeft")}
            value={String(current.value[1])}
            onChange={handleChange(1)}
          />
        </Grid>
        <Grid xs={24}>
          <Input
            width="100%"
            htmlType="number"
            placeholder={t("rectangleBottom")}
            label={t("rectangleBottom")}
            aria-label={t("rectangleBottom")}
            value={String(current.value[2])}
            onChange={handleChange(2)}
          />
        </Grid>
        <Grid xs={24}>
          <Input
            width="100%"
            htmlType="number"
            placeholder={t("rectangleRight")}
            label={t("rectangleRight")}
            aria-label={t("rectangleRight")}
            value={String(current.value[3])}
            onChange={handleChange(3)}
          />
        </Grid>
      </Grid.Container>
    );
  }
);
