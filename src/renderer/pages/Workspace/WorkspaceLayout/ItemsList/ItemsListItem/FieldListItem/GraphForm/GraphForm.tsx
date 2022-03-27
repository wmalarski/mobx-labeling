import { Button, Grid, Input, Select, Spacer, Text } from "@geist-ui/core";
import { TrashIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, Fragment, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { GraphField } from "renderer/models";
import { Tool } from "renderer/models/project/Tool";

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
      <Button width="100%" onClick={handleDrawClick}>
        {t("graphDraw")}
      </Button>
    );
  }

  const handleXChange =
    (pairIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      current.updateX(pairIndex, value);
    };

  const handleYChange =
    (pairIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
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
        <Button onClick={handleAddPointClick}>{t("graphAddPoint")}</Button>
      </Grid>
      {current.points.map((pair, index) => (
        <Fragment key={index}>
          <Grid xs={20} sm={11}>
            <Input
              width="100%"
              htmlType="number"
              placeholder={t("graphX", { index })}
              label={t("graphX", { index })}
              aria-label={t("graphX", { index })}
              value={String(pair.x)}
              onChange={handleXChange(index)}
            />
          </Grid>
          <Grid xs={20} sm={11}>
            <Input
              width="100%"
              htmlType="number"
              placeholder={t("graphY", { index })}
              label={t("graphY", { index })}
              aria-label={t("graphY", { index })}
              value={String(pair.y)}
              onChange={handleYChange(index)}
            />
          </Grid>
          <Grid xs={4} sm={2}>
            <Button
              width="100%"
              onClick={handleRemovePointClick(index)}
              iconRight={
                <TrashIcon aria-label={t("graphRemovePoint", { index })} />
              }
            />
          </Grid>
        </Fragment>
      ))}
      <Grid xs={24} alignItems="center">
        <Text>{t("graphEdges")}</Text>
        <Spacer w={1} />
        <Button onClick={handleAddEdgeClick}>{t("graphAddEdge")}</Button>
      </Grid>
      {current.edges.map((pair, index) => (
        <Fragment key={index}>
          <Grid xs={20} sm={11} alignItems="center">
            <Text span style={{ whiteSpace: "nowrap" }} type="secondary">
              {t("graphFrom", { index })}
            </Text>
            <Spacer w={1} />
            <Select
              width="100%"
              placeholder={t("graphFrom", { index })}
              aria-label={t("graphFrom", { index })}
              value={String(pair.from)}
              onChange={handleFromChange(index)}
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
              width="100%"
              placeholder={t("graphTo", { index })}
              aria-label={t("graphTo", { index })}
              value={String(pair.to)}
              onChange={handleToChange(index)}
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
              width="100%"
              onClick={handleRemoveEdgeClick(index)}
              iconRight={
                <TrashIcon aria-label={t("graphRemoveEdge", { index })} />
              }
            />
          </Grid>
        </Fragment>
      ))}
    </Grid.Container>
  );
});
