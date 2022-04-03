import { Button, Grid, Input, Select } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, Fragment, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Box3dField, Box3dSideType, Tool, toPairs } from "renderer/models";

type Props = {
  field: Instance<typeof Box3dField>;
  tool: Instance<typeof Tool>;
};

export const Box3dForm = observer(({ field, tool }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  const current = field.current;

  const handleDrawClick = () => {
    tool.setCreator(field);
  };

  if (!current) {
    return (
      <Button disabled={field.blocked} width="100%" onClick={handleDrawClick}>
        {t("box3dDraw")}
      </Button>
    );
  }

  const frontPairs = toPairs(current.front);
  const showSide = current.sideType !== "None";
  const sidePairs = current.side && showSide ? toPairs(current.side) : [];

  const handleFrontChange =
    (pairIndex: number, position: number) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.valueAsNumber;
      const index = pairIndex * 2 + position;
      current.updateFront(index, value);
    };

  const handleTypeChange = (value: string | string[]) => {
    const sideType = value as Instance<typeof Box3dSideType>;
    current.updateSideType(sideType);
  };

  const handleSideChange =
    (pairIndex: number, position: number) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.valueAsNumber;
      const index = pairIndex * 2 + position;
      current.updateSide(index, value);
    };

  return (
    <Grid.Container gap={1}>
      {frontPairs.map((pair, index) => (
        <Fragment key={index}>
          <Grid xs={12}>
            <Input
              aria-label={t("box3dX", { index })}
              disabled={field.blocked}
              htmlType="number"
              label={t("box3dX", { index })}
              onChange={handleFrontChange(index, 0)}
              placeholder={t("box3dX", { index })}
              value={String(pair[0])}
              width="100%"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              aria-label={t("box3dY", { index })}
              disabled={field.blocked}
              htmlType="number"
              label={t("box3dY", { index })}
              onChange={handleFrontChange(index, 1)}
              placeholder={t("box3dY", { index })}
              value={String(pair[1])}
              width="100%"
            />
          </Grid>
        </Fragment>
      ))}
      <Select
        aria-label={t("box3dPlaceholder")}
        disabled={field.blocked}
        onChange={handleTypeChange}
        placeholder={t("box3dPlaceholder")}
        value={current.sideType}
        width="100%"
      >
        <Select.Option value="Right">{t("box3dRight")}</Select.Option>
        <Select.Option value="Left">{t("box3dLeft")}</Select.Option>
        <Select.Option value="None">{t("box3dNone")}</Select.Option>
      </Select>
      {sidePairs.map((pair, index) => (
        <Fragment key={index}>
          <Grid xs={12}>
            <Input
              aria-label={t("box3dSideX", { index })}
              disabled={field.blocked}
              htmlType="number"
              label={t("box3dSideX", { index })}
              onChange={handleSideChange(index, 0)}
              placeholder={t("box3dSideX", { index })}
              value={String(pair[0])}
              width="100%"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              aria-label={t("box3dSideY", { index })}
              disabled={field.blocked}
              htmlType="number"
              label={t("box3dSideY", { index })}
              onChange={handleSideChange(index, 1)}
              placeholder={t("box3dSideY", { index })}
              value={String(pair[1])}
              width="100%"
            />
          </Grid>
        </Fragment>
      ))}
    </Grid.Container>
  );
});
