import {
  Button,
  Card,
  FormElement,
  Grid,
  Input,
  Spacer,
  Text,
} from "@nextui-org/react";
import { TrashIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Resource } from "renderer/models/project/Resource";

type Props = {
  resource: Instance<typeof Resource>;
  onRemoveClick: () => void;
};

export const ResourcesListItem = observer(
  ({ resource, onRemoveClick }: Props): ReactElement => {
    const { t } = useTranslation("project");

    const handleFpsChange = (event: ChangeEvent<FormElement>) => {
      resource.setFps(Number(event.target.value.split(".")[0]));
    };

    const handleFrameShiftChange = (event: ChangeEvent<FormElement>) => {
      resource.setFrameShift(Number(event.target.value.split(".")[0]));
    };

    return (
      <Card>
        <Grid.Container gap={0.5} alignItems="center">
          <Grid sm={2} xs={4}>
            <Text small color="$accents6">
              {t("resourcePathLabel")}
            </Text>
          </Grid>
          <Grid sm={10} xs={8}>
            <Text h5>{resource.path}</Text>
          </Grid>
          <Grid sm={2} xs={4}>
            <Text small color="$accents6">
              {t("resourceFpsLabel")}
            </Text>
          </Grid>
          <Grid sm={10} xs={8}>
            <Input
              fullWidth
              type="number"
              step={1}
              min={1}
              labelLeft={t("resourceFpsLabel")}
              placeholder={t("resourceFpsLabel")}
              aria-label={t("resourceFpsLabel")}
              value={String(resource.fps)}
              onChange={handleFpsChange}
            />
          </Grid>
          <Grid sm={2} xs={4}>
            <Text small color="$accents6">
              {t("resourceFrameShiftLabel")}
            </Text>
          </Grid>
          <Grid sm={10} xs={8}>
            <Input
              fullWidth
              type="number"
              step={1}
              labelLeft={t("resourceFrameShiftLabel")}
              placeholder={t("resourceFrameShiftLabel")}
              aria-label={t("resourceFrameShiftLabel")}
              value={String(resource.frameShift)}
              onChange={handleFrameShiftChange}
            />
          </Grid>
        </Grid.Container>
        <Spacer y={1} />
        <Grid.Container gap={1}>
          <Grid>
            <Button color="error" onClick={onRemoveClick} icon={<TrashIcon />}>
              {t("resourceRemove")}
            </Button>
          </Grid>
        </Grid.Container>
      </Card>
    );
  }
);
