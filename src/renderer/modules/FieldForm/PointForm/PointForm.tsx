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
      <Button disabled={field.blocked} width="100%" onClick={handleDrawClick}>
        {t("pointDraw")}
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
          aria-label={t("pointX")}
          disabled={field.blocked}
          htmlType="number"
          label={t("pointX")}
          onChange={handleChange(0)}
          placeholder={t("pointX")}
          value={String(current.value[0])}
          width="100%"
        />
      </Grid>
      <Grid xs={24}>
        <Input
          aria-label={t("pointY")}
          disabled={field.blocked}
          htmlType="number"
          label={t("pointY")}
          onChange={handleChange(1)}
          placeholder={t("pointY")}
          value={String(current.value[1])}
          width="100%"
        />
      </Grid>
    </Grid.Container>
  );
});
