import { Button, Container, FormElement, Input, Row } from "@nextui-org/react";
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
      <Container>
        <Row>
          <Button auto onClick={handleRemoveClick}>
            {t("removeItem")}
          </Button>
          <Button auto onClick={handleCopyClick}>
            {t("copyItem")}
          </Button>
        </Row>
        <Row>
          <Input
            value={itemDefinition.name}
            onChange={handleNameChange}
            labelPlaceholder={t("namePlaceholder")}
          />
        </Row>
        <Row>
          <Input
            value={itemDefinition.description}
            onChange={handleDescriptionChange}
            labelPlaceholder={t("descriptionPlaceholder")}
          />
        </Row>
      </Container>
    );
  }
);
