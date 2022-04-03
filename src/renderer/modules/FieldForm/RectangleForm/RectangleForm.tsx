import { Button, Grid, Input } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { RectangleField, Tool } from "renderer/models";

type Props = {
  field: Instance<typeof RectangleField>;
  tool: Instance<typeof Tool>;
};

export const RectangleForm = observer(
  ({ field, tool }: Props): ReactElement => {
    const { t } = useTranslation("workspace");

    const current = field.current;

    const handleDrawClick = () => {
      tool.setCreator(field);
    };

    if (!current) {
      return (
        <Button disabled={field.blocked} width="100%" onClick={handleDrawClick}>
          {t("rectangleDraw")}
        </Button>
      );
    }

    const handleChange =
      (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.valueAsNumber;
        current.updateValue(index, value);
      };

    return (
      <Grid.Container gap={1}>
        <Grid xs={24}>
          <Input
            aria-label={t("rectangleTop")}
            disabled={field.blocked}
            htmlType="number"
            label={t("rectangleTop")}
            onChange={handleChange(0)}
            placeholder={t("rectangleTop")}
            value={String(current.value[0])}
            width="100%"
          />
        </Grid>
        <Grid xs={24}>
          <Input
            aria-label={t("rectangleLeft")}
            disabled={field.blocked}
            htmlType="number"
            label={t("rectangleLeft")}
            onChange={handleChange(1)}
            placeholder={t("rectangleLeft")}
            value={String(current.value[1])}
            width="100%"
          />
        </Grid>
        <Grid xs={24}>
          <Input
            aria-label={t("rectangleBottom")}
            disabled={field.blocked}
            htmlType="number"
            label={t("rectangleBottom")}
            onChange={handleChange(2)}
            placeholder={t("rectangleBottom")}
            value={String(current.value[2])}
            width="100%"
          />
        </Grid>
        <Grid xs={24}>
          <Input
            aria-label={t("rectangleRight")}
            disabled={field.blocked}
            htmlType="number"
            label={t("rectangleRight")}
            onChange={handleChange(3)}
            placeholder={t("rectangleRight")}
            value={String(current.value[3])}
            width="100%"
          />
        </Grid>
      </Grid.Container>
    );
  }
);
