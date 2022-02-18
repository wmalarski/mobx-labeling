import { Container, Row, Spacer, Text } from "@nextui-org/react";
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
      <Container>
        <Row>
          <Text h4>{t("figureHeader")}</Text>
        </Row>
        <Spacer y={1} />
        <Row>
          <ColorSlider
            channel="hue"
            value={fieldDefinition.color}
            onChange={(color) => {
              fieldDefinition.setColor(color.toString("hsl"));
            }}
            label={t("colorSliderLabel")}
          />
        </Row>
      </Container>
    );
  }
);
