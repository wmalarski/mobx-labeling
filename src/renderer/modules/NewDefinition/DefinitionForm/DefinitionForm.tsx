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
import { ProjectDefinition } from "renderer/models/definition";

type Props = {
  projectDefinition: Instance<typeof ProjectDefinition>;
};

export const DefinitionForm = observer(
  ({ projectDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handleNameChange = (event: ChangeEvent<FormElement>) => {
      projectDefinition.setName(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<FormElement>) => {
      projectDefinition.setDescription(event.target.value);
    };

    return (
      <Container gap={0}>
        <Row>
          <Text h1>{t("newDefinitionHeader")}</Text>
        </Row>
        <Spacer y={0.5} />
        <Row>
          <Input
            fullWidth
            value={projectDefinition.name}
            onChange={handleNameChange}
            placeholder={t("namePlaceholder")}
            labelLeft={t("namePlaceholder")}
            aria-label={t("namePlaceholder")}
          />
        </Row>
        <Spacer y={0.5} />
        <Row>
          <Input
            fullWidth
            value={projectDefinition.description}
            onChange={handleDescriptionChange}
            placeholder={t("descriptionPlaceholder")}
            labelLeft={t("descriptionPlaceholder")}
            aria-label={t("descriptionPlaceholder")}
          />
        </Row>
      </Container>
    );
  }
);
