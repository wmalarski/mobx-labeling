import { Button, Grid, Input } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, Fragment, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { EyeField, Tool, toPairs } from "renderer/models";

type Props = {
  field: Instance<typeof EyeField>;
  tool: Instance<typeof Tool>;
};

export const EyeForm = observer(({ field, tool }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  const current = field.current;

  const handleDrawClick = () => {
    tool.setCreator(field);
  };

  if (!current) {
    return (
      <Button disabled={field.blocked} width="100%" onClick={handleDrawClick}>
        {t("eyeDraw")}
      </Button>
    );
  }

  const pairs = toPairs(current.values);

  const handleChange =
    (pairIndex: number, position: number) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.valueAsNumber;
      const index = pairIndex * 2 + position;
      current.updateValue(index, value);
    };

  return (
    <Grid.Container gap={1}>
      {pairs.map((pair, index) => (
        <Fragment key={index}>
          <Grid xs={12}>
            <Input
              aria-label={t("eyeX", { index })}
              disabled={field.blocked}
              htmlType="number"
              label={t("eyeX", { index })}
              onChange={handleChange(index, 0)}
              placeholder={t("eyeX", { index })}
              value={String(pair[0])}
              width="100%"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              aria-label={t("eyeY", { index })}
              disabled={field.blocked}
              htmlType="number"
              label={t("eyeY", { index })}
              onChange={handleChange(index, 1)}
              placeholder={t("eyeY", { index })}
              value={String(pair[1])}
              width="100%"
            />
          </Grid>
        </Fragment>
      ))}
    </Grid.Container>
  );
});
