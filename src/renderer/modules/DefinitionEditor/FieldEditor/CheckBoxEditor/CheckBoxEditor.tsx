import {
  Checkbox,
  CheckboxEvent,
  Container,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { CheckBoxDefinition } from "renderer/models";

type Props = {
  fieldDefinition: Instance<typeof CheckBoxDefinition>;
};

export const CheckBoxEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handleChange = (event: CheckboxEvent) => {
      fieldDefinition.setDefault(event.target.checked);
    };

    return (
      <Container gap={0}>
        <Row>
          <Text h5>{t("checkboxHeader")}</Text>
        </Row>
        <Spacer y={1} />
        <Row>
          <Checkbox checked={fieldDefinition.default} onChange={handleChange}>
            {fieldDefinition.default
              ? t("checkboxDefaultTrue")
              : t("checkboxDefaultFalse")}
          </Checkbox>
        </Row>
      </Container>
    );
  }
);
