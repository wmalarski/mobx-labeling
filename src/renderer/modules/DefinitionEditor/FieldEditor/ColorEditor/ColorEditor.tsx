import { Grid, Text } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ColorSlider } from "renderer/components";
import { ShapeDefinition } from "renderer/models";

type Props = {
  fieldDefinition: Instance<typeof ShapeDefinition>;
};

export const ColorEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    return (
      <Grid.Container gap={1}>
        <Grid xs={24}>
          <Text h5>{t("figureHeader")}</Text>
        </Grid>
        <Grid xs={24}>
          <ColorSlider
            channel="hue"
            label={t("colorSliderLabel")}
            onChange={(color) => {
              fieldDefinition.setColor(color.toString("hsl"));
            }}
            value={fieldDefinition.color}
          />
        </Grid>
      </Grid.Container>
    );
  }
);
