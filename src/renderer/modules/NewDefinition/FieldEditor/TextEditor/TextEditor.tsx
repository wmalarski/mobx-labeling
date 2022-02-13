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
import { TextDefinition } from "renderer/models/fields/text";

type Props = {
  fieldDefinition: Instance<typeof TextDefinition>;
};

export const TextEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handleDefaultChange = (event: ChangeEvent<FormElement>) => {
      fieldDefinition.setDefault(event.target.value);
    };

    return (
      <Container gap={0}>
        <Row>
          <Text h4>{t("textHeader")}</Text>
        </Row>
        <Spacer y={1} />
        <Row>
          <Input
            fullWidth
            aria-label={t("textDefault")}
            labelLeft={t("textDefault")}
            placeholder={t("textDefault")}
            value={fieldDefinition.default}
            onChange={handleDefaultChange}
          />
        </Row>
      </Container>
    );
  }
);
