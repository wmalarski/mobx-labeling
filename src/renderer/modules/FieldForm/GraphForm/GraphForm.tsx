import { Button, Grid, Input, Select, Spacer, Text } from "@geist-ui/core";
import { TrashIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, Fragment, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { GraphField, Tool } from "renderer/models";

type Props = {
  field: Instance<typeof GraphField>;
  tool: Instance<typeof Tool>;
};

export const GraphForm = observer(({ field, tool }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  const current = field.current;

  const handleDrawClick = () => {
    tool.setCreator(field);
  };

  if (!current) {
    return (
      <Button disabled={field.blocked} width="100%" onClick={handleDrawClick}>
        {t("graphDraw")}
      </Button>
    );
  }

  const handleXChange =
    (pairIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.valueAsNumber;
      current.updateX(pairIndex, value);
    };

  const handleYChange =
    (pairIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.valueAsNumber;
      current.updateY(pairIndex, value);
    };

  const handleAddPointClick = () => {
    current.addPoint(0, 0, 0);
  };

  const handleRemovePointClick = (index: number) => () => {
    current.removePoint(index);
  };

  const handleAddEdgeClick = () => {
    current.addEdge(0, 0, 1);
  };

  const handleRemoveEdgeClick = (index: number) => () => {
    current.removeEdge(index);
  };

  const handleFromChange =
    (pairIndex: number) => (newValue: string | string[]) => {
      const value = Number(newValue);
      current.updateFrom(pairIndex, value);
    };

  const handleToChange =
    (pairIndex: number) => (newValue: string | string[]) => {
      const value = Number(newValue);
      current.updateTo(pairIndex, value);
    };

  return (
    <Grid.Container gap={1}>
      <Grid xs={24} alignItems="center">
        <Text>{t("graphPoints")}</Text>
        <Spacer w={1} />
        <Button disabled={field.blocked} onClick={handleAddPointClick}>
          {t("graphAddPoint")}
        </Button>
      </Grid>
      {current.points.map((pair, index) => (
        <Fragment key={index}>
          <Grid xs={20} sm={11}>
            <Input
              aria-label={t("graphX", { index })}
              disabled={field.blocked}
              htmlType="number"
              label={t("graphX", { index })}
              onChange={handleXChange(index)}
              placeholder={t("graphX", { index })}
              value={String(pair.x)}
              width="100%"
            />
          </Grid>
          <Grid xs={20} sm={11}>
            <Input
              aria-label={t("graphY", { index })}
              disabled={field.blocked}
              htmlType="number"
              label={t("graphY", { index })}
              onChange={handleYChange(index)}
              placeholder={t("graphY", { index })}
              value={String(pair.y)}
              width="100%"
            />
          </Grid>
          <Grid xs={4} sm={2}>
            <Button
              disabled={field.blocked}
              iconRight={
                <TrashIcon aria-label={t("graphRemovePoint", { index })} />
              }
              onClick={handleRemovePointClick(index)}
              width="100%"
            />
          </Grid>
        </Fragment>
      ))}
      <Grid xs={24} alignItems="center">
        <Text>{t("graphEdges")}</Text>
        <Spacer w={1} />
        <Button disabled={field.blocked} onClick={handleAddEdgeClick}>
          {t("graphAddEdge")}
        </Button>
      </Grid>
      {current.edges.map((pair, index) => (
        <Fragment key={index}>
          <Grid xs={20} sm={11} alignItems="center">
            <Text span style={{ whiteSpace: "nowrap" }} type="secondary">
              {t("graphFrom", { index })}
            </Text>
            <Spacer w={1} />
            <Select
              aria-label={t("graphFrom", { index })}
              disabled={field.blocked}
              onChange={handleFromChange(index)}
              placeholder={t("graphFrom", { index })}
              value={String(pair.from)}
              width="100%"
            >
              {current.points.map((_, index) => (
                <Select.Option key={index} value={String(index)}>
                  {index}
                </Select.Option>
              ))}
            </Select>
          </Grid>
          <Grid xs={20} sm={11} alignItems="center">
            <Text span style={{ whiteSpace: "nowrap" }} type="secondary">
              {t("graphTo", { index })}
            </Text>
            <Spacer w={1} />
            <Select
              aria-label={t("graphTo", { index })}
              disabled={field.blocked}
              onChange={handleToChange(index)}
              placeholder={t("graphTo", { index })}
              value={String(pair.to)}
              width="100%"
            >
              {current.points.map((_, index) => (
                <Select.Option key={index} value={String(index)}>
                  {index}
                </Select.Option>
              ))}
            </Select>
          </Grid>
          <Grid xs={4} sm={2} alignItems="center">
            <Button
              disabled={field.blocked}
              iconRight={
                <TrashIcon aria-label={t("graphRemoveEdge", { index })} />
              }
              onClick={handleRemoveEdgeClick(index)}
              width="100%"
            />
          </Grid>
        </Fragment>
      ))}
    </Grid.Container>
  );
});
