import { Button, Card, Grid, Input, Text } from "@geist-ui/core";
import { TrashIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Resource } from "renderer/models";

type Props = {
  resource: Instance<typeof Resource>;
  onRemoveClick: () => void;
};

export const ResourcesListItem = observer(
  ({ resource, onRemoveClick }: Props): ReactElement => {
    const { t } = useTranslation("project");

    const handleFpsChange = (event: ChangeEvent<HTMLInputElement>) => {
      resource.setFps(Number(event.target.value.split(".")[0]));
    };

    const handleFrameShiftChange = (event: ChangeEvent<HTMLInputElement>) => {
      resource.setFrameShift(Number(event.target.value.split(".")[0]));
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
              onClick={onRemoveClick}
              icon={<TrashIcon />}
            >
              {t("resourceRemove")}
            </Button>
          </Grid>
          <Grid xs={24}>
            <Input
              width="100%"
              step={1}
              min={1}
              htmlType="number"
              label={t("resourceFpsLabel")}
              placeholder={t("resourceFpsLabel")}
              aria-label={t("resourceFpsLabel")}
              value={String(resource.fps)}
              onChange={handleFpsChange}
            />
          </Grid>
          <Grid xs={24}>
            <Input
              width="100%"
              step={1}
              htmlType="number"
              label={t("resourceFrameShiftLabel")}
              placeholder={t("resourceFrameShiftLabel")}
              aria-label={t("resourceFrameShiftLabel")}
              value={String(resource.frameShift)}
              onChange={handleFrameShiftChange}
            />
          </Grid>
        </Grid.Container>
      </Card>
    );
  }
);
