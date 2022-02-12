import { Col, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ColorSlider } from "renderer/components";
import { ShapeDefinition } from "renderer/models/definition";

type Props = {
  fieldDefinition: Instance<typeof ShapeDefinition>;
};

export const ColorEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    return (
      <Col>
        <Text h4>{t("figureHeader")}</Text>
        <ColorSlider
          channel="hue"
          value={fieldDefinition.color}
          onChange={(color) => {
            fieldDefinition.setColor(color.toString("hsl"));
          }}
          label={t("colorSliderLabel")}
        />
      </Col>
    );
  }
);
