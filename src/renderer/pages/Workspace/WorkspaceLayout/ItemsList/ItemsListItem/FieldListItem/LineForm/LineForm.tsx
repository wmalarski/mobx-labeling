import { Button, Grid, Input, Spacer, Text } from "@geist-ui/core";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, Fragment, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { LineField } from "renderer/models";
import { toPairs } from "./LineForm.utils";

type Props = {
  field: Instance<typeof LineField>;
};

export const LineForm = observer(({ field }: Props): ReactElement => {
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

  const handleAddClick = (pairIndex: number) => () => {
    const index = pairIndex * 2;
    current.addPoint(index, 0, 0);
  };

  const handleRemoveClick = (pairIndex: number) => () => {
    const index = pairIndex * 2;
    current.removePoint(index);
  };

  const handleMoveUpClick = (pairIndex: number) => () => {
    const [x, y] = pairs[pairIndex];
    const index = pairIndex * 2;
    current.removePoint(index);
    current.addPoint(index - 2, x, y);
  };

  const handleMoveDownClick = (pairIndex: number) => () => {
    const [x, y] = pairs[pairIndex];
    const index = pairIndex * 2;
    current.removePoint(index);
    current.addPoint(index + 2, x, y);
  };

  return (
    <Grid.Container gap={1}>
      <Grid xs={24} alignItems="center">
        <Text>{t("linePoints")}</Text>
        <Spacer w={1} />
        <Button onClick={handleAddClick(0)}>
          {t("lineAdd", { index: 0 })}
        </Button>
      </Grid>
      {pairs.map((pair, index) => (
        <Fragment key={index}>
          <Grid xs={12} md={8}>
            <Input
              width="100%"
              htmlType="number"
              placeholder={t("lineX", { index })}
              label={t("lineX", { index })}
              aria-label={t("lineX", { index })}
              value={String(pair[0])}
              onChange={handleChange(index, 0)}
            />
          </Grid>
          <Grid xs={12} md={8}>
            <Input
              width="100%"
              htmlType="number"
              placeholder={t("lineY", { index })}
              label={t("lineY", { index })}
              aria-label={t("lineY", { index })}
              value={String(pair[1])}
              onChange={handleChange(index, 1)}
            />
          </Grid>
          <Grid xs={6} md={2}>
            <Button
              width="100%"
              disabled={!index}
              onClick={handleMoveUpClick(index)}
              iconRight={<ArrowUpIcon aria-label={t("lineUp", { index })} />}
            />
          </Grid>
          <Grid xs={6} md={2}>
            <Button
              width="100%"
              disabled={index >= pairs.length - 1}
              onClick={handleMoveDownClick(index)}
              iconRight={
                <ArrowDownIcon aria-label={t("lineDown", { index })} />
              }
            />
          </Grid>
          <Grid xs={6} md={2}>
            <Button
              width="100%"
              onClick={handleAddClick(index)}
              iconRight={<PlusIcon aria-label={t("lineAdd", { index })} />}
            />
          </Grid>
          <Grid xs={6} md={2}>
            <Button
              width="100%"
              onClick={handleRemoveClick(index)}
              iconRight={<TrashIcon aria-label={t("lineRemove", { index })} />}
            />
          </Grid>
        </Fragment>
      ))}
    </Grid.Container>
  );
});
