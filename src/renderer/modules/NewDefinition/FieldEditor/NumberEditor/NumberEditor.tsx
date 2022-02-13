import {
  Container,
  FormElement,
  Input,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { NumberDefinition } from "renderer/models/fields/number";

type Props = {
  fieldDefinition: Instance<typeof NumberDefinition>;
};

export const NumberEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handleMinChange = (event: ChangeEvent<FormElement>) => {
      fieldDefinition.setMin(Number(event.target.value));
    };

    const handleMaxChange = (event: ChangeEvent<FormElement>) => {
      fieldDefinition.setMax(Number(event.target.value));
    };

    const handleStepChange = (event: ChangeEvent<FormElement>) => {
      fieldDefinition.setStep(Number(event.target.value));
    };

    const handleDefaultChange = (event: ChangeEvent<FormElement>) => {
      fieldDefinition.setDefault(Number(event.target.value));
    };

    return (
      <Container>
        <Row>
          <Text h4>{t("numberHeader")}</Text>
        </Row>
        <Spacer y={1} />
        <Row>
          <Input
            fullWidth
            type="number"
            aria-label={t("numberMin")}
            labelLeft={t("numberMin")}
            value={String(fieldDefinition.min)}
            onChange={handleMinChange}
          />
        </Row>
        <Spacer y={0.5} />
        <Row>
          <Input
            fullWidth
            type="number"
            aria-label={t("numberMax")}
            labelLeft={t("numberMax")}
            value={String(fieldDefinition.max)}
            onChange={handleMaxChange}
          />
        </Row>
        <Spacer y={0.5} />
        <Row>
          <Input
            fullWidth
            type="number"
            aria-label={t("numberStep")}
            labelLeft={t("numberStep")}
            value={String(fieldDefinition.step)}
            onChange={handleStepChange}
          />
        </Row>
        <Spacer y={0.5} />
        <Row>
          <Input
            fullWidth
            type="number"
            aria-label={t("numberDefault")}
            labelLeft={t("numberDefault")}
            value={String(fieldDefinition.default)}
            onChange={handleDefaultChange}
          />
        </Row>
      </Container>
    );
  }
);
