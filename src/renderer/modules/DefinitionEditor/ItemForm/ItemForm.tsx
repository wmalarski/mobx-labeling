import {
  Button,
  Container,
  FormElement,
  Input,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { CopyIcon, TrashIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ItemDefinition, ProjectDefinition } from "renderer/models";

type Props = {
  itemDefinition: Instance<typeof ItemDefinition>;
  projectDefinition: Instance<typeof ProjectDefinition>;
  onSelectedItemChange: (itemId: string | null) => void;
};

export const ItemForm = observer(
  ({
    itemDefinition,
    projectDefinition,
    onSelectedItemChange,
  }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handleNameChange = (event: ChangeEvent<FormElement>) => {
      itemDefinition.setName(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<FormElement>) => {
      itemDefinition.setDescription(event.target.value);
    };

    const handleRemoveClick = () => {
      projectDefinition.removeItem(itemDefinition);
      const selected = projectDefinition.items.at(0)?.id ?? null;
      onSelectedItemChange(selected);
    };

    const handleCopyClick = () => {
      const name = t("copyName", { name: itemDefinition.name });
      const copy = projectDefinition.copyItem(itemDefinition, name);
      onSelectedItemChange(copy.id);
    };

    return (
      <Container gap={0}>
        <Row>
          <Text h2>{t("itemFormHeader")}</Text>
          <Spacer x={0.5} />
          <Button
            auto
            color="secondary"
            onClick={handleCopyClick}
            icon={<CopyIcon />}
          >
            {t("copyItem")}
          </Button>
          <Spacer x={0.5} />
          <Button
            auto
            color="error"
            onClick={handleRemoveClick}
            icon={<TrashIcon />}
          >
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
