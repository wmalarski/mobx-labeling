import { Button, Grid, Input } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { PointField, Tool } from "renderer/models";

type Props = {
  field: Instance<typeof PointField>;
  tool: Instance<typeof Tool>;
};

export const PointForm = observer(({ field, tool }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  const current = field.current;

  const handleDrawClick = () => {
    tool.setCreator(field);
  };

  if (!current) {
    return (
      <Button width="100%" onClick={handleDrawClick}>
        {t("pointDraw")}
      </Button>
    );
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
          placeholder={t("pointX")}
          label={t("pointX")}
          aria-label={t("pointX")}
          value={String(current.value[0])}
          onChange={handleChange(0)}
        />
      </Grid>
      <Grid xs={24}>
        <Input
          width="100%"
          htmlType="number"
          placeholder={t("pointY")}
          label={t("pointY")}
          aria-label={t("pointY")}
          value={String(current.value[1])}
          onChange={handleChange(1)}
        />
      </Grid>
    </Grid.Container>
  );
});
