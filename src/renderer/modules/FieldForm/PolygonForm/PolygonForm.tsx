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
import { PolygonField, Tool, toPairs } from "renderer/models";

type Props = {
  field: Instance<typeof PolygonField>;
  tool: Instance<typeof Tool>;
};

export const PolygonForm = observer(({ field, tool }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  const current = field.current;

  const handleDrawClick = () => {
    tool.setCreator(field);
  };

  if (!current) {
    return (
      <Button disabled={field.blocked} width="100%" onClick={handleDrawClick}>
        {t("polygonDraw")}
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
        <Text>{t("polygonPoints")}</Text>
        <Spacer w={1} />
        <Button disabled={field.blocked} onClick={handleAddClick(0)}>
          {t("polygonAdd", { index: 0 })}
        </Button>
      </Grid>
      {pairs.map((pair, index) => (
        <Fragment key={index}>
          <Grid xs={12} md={8}>
            <Input
              aria-label={t("polygonX", { index })}
              disabled={field.blocked}
              htmlType="number"
              label={t("polygonX", { index })}
              onChange={handleChange(index, 0)}
              placeholder={t("polygonX", { index })}
              value={String(pair[0])}
              width="100%"
            />
          </Grid>
          <Grid xs={12} md={8}>
            <Input
              aria-label={t("polygonY", { index })}
              disabled={field.blocked}
              htmlType="number"
              label={t("polygonY", { index })}
              onChange={handleChange(index, 1)}
              placeholder={t("polygonY", { index })}
              value={String(pair[1])}
              width="100%"
            />
          </Grid>
          <Grid xs={6} md={2}>
            <Button
              disabled={field.blocked || !index}
              iconRight={<ArrowUpIcon aria-label={t("polygonUp", { index })} />}
              onClick={handleMoveUpClick(index)}
              width="100%"
            />
          </Grid>
          <Grid xs={6} md={2}>
            <Button
              disabled={field.blocked || index >= pairs.length - 1}
              iconRight={
                <ArrowDownIcon aria-label={t("polygonDown", { index })} />
              }
              onClick={handleMoveDownClick(index)}
              width="100%"
            />
          </Grid>
          <Grid xs={6} md={2}>
            <Button
              disabled={field.blocked}
              iconRight={<PlusIcon aria-label={t("polygonAdd", { index })} />}
              onClick={handleAddClick(index)}
              width="100%"
            />
          </Grid>
          <Grid xs={6} md={2}>
            <Button
              disabled={field.blocked}
              iconRight={
                <TrashIcon aria-label={t("polygonRemove", { index })} />
              }
              onClick={handleRemoveClick(index)}
              width="100%"
            />
          </Grid>
        </Fragment>
      ))}
    </Grid.Container>
  );
});
