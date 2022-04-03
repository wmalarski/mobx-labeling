import { Button, Card, Grid, Input, Text } from "@geist-ui/core";
import { TrashIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Resource } from "renderer/models";

type Props = {
  onRemoveClick: () => void;
  resource: Instance<typeof Resource>;
};

export const ResourcesListItem = observer(
  ({ onRemoveClick, resource }: Props): ReactElement => {
    const { t } = useTranslation("project");

    const handleFpsChange = (event: ChangeEvent<HTMLInputElement>) => {
      const fps = Number(event.target.valueAsNumber.toFixed(0));
      resource.setFps(fps);
    };

    const handleFrameShiftChange = (event: ChangeEvent<HTMLInputElement>) => {
      const shift = Number(event.target.valueAsNumber.toFixed(0));
      resource.setFrameShift(shift);
    };

    return (
      <Card width="100%">
        <Grid.Container gap={0.5} alignItems="center" justify="space-between">
          <Grid>
            <Text h5>{resource.path}</Text>
          </Grid>
          <Grid>
            <Button
              auto
              color="error"
              icon={<TrashIcon />}
              onClick={onRemoveClick}
            >
              {t("resourceRemove")}
            </Button>
          </Grid>
          <Grid xs={24}>
            <Input
              aria-label={t("resourceFpsLabel")}
              htmlType="number"
              label={t("resourceFpsLabel")}
              min={1}
              onChange={handleFpsChange}
              placeholder={t("resourceFpsLabel")}
              step={1}
              value={String(resource.fps)}
              width="100%"
            />
          </Grid>
          <Grid xs={24}>
            <Input
              aria-label={t("resourceFrameShiftLabel")}
              htmlType="number"
              label={t("resourceFrameShiftLabel")}
              onChange={handleFrameShiftChange}
              placeholder={t("resourceFrameShiftLabel")}
              step={1}
              value={String(resource.frameShift)}
              width="100%"
            />
          </Grid>
        </Grid.Container>
      </Card>
    );
  }
);
