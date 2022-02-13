import {
  Button,
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
import { ItemDefinition, ProjectDefinition } from "renderer/models/definition";

type Props = {
  itemDefinition: Instance<typeof ItemDefinition>;
  projectDefinition: Instance<typeof ProjectDefinition>;
};

export const ItemForm = observer(
  ({ itemDefinition, projectDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handleNameChange = (event: ChangeEvent<FormElement>) => {
      itemDefinition.setName(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<FormElement>) => {
      itemDefinition.setDescription(event.target.value);
    };

    const handleRemoveClick = () => {
      projectDefinition.removeItem(itemDefinition);
    };

    const handleCopyClick = () => {
      const name = t("copyName", { name: itemDefinition.name });
      projectDefinition.copyItem(itemDefinition, name);
    };

    return (
      <Container gap={0}>
        <Row>
          <Text h2>{t("itemFormHeader")}</Text>
          <Spacer x={0.5} />
          <Button auto onClick={handleCopyClick}>
            {t("copyItem")}
          </Button>
          <Spacer x={0.5} />
          <Button auto onClick={handleRemoveClick} color="error">
            {t("removeItem")}
          </Button>
        </Row>
        <Spacer y={0.5} />
        <Row>
          <Input
            fullWidth
            value={itemDefinition.name}
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
            value={itemDefinition.description}
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
