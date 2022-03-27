import { Grid, Input, Text } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, Fragment, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { EyeField } from "renderer/models";
import { toPairs } from "renderer/models/fields/utils";

type Props = {
  field: Instance<typeof EyeField>;
};

export const EyeForm = observer(({ field }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  const current = field.current;

  if (!current) {
    return <Text type="error">{t("invalidField")}</Text>;
  }

  const pairs = toPairs(current.values);

  const handleChange =
    (pairIndex: number, position: number) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      const index = pairIndex * 2 + position;
      current.updateValue(index, value);
    };

  return (
    <Grid.Container gap={1}>
      {pairs.map((pair, index) => (
        <Fragment key={index}>
          <Grid xs={12}>
            <Input
              width="100%"
              htmlType="number"
              placeholder={t("eyeX", { index })}
              label={t("eyeX", { index })}
              aria-label={t("eyeX", { index })}
              value={String(pair[0])}
              onChange={handleChange(index, 0)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              width="100%"
              htmlType="number"
              placeholder={t("eyeY", { index })}
              label={t("eyeY", { index })}
              aria-label={t("eyeY", { index })}
              value={String(pair[1])}
              onChange={handleChange(index, 1)}
            />
          </Grid>
        </Fragment>
      ))}
    </Grid.Container>
  );
});
