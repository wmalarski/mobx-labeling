import { Button, Text } from "@geist-ui/core";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ItemDefinition } from "renderer/models";

type Props = {
  itemDefinition: Instance<typeof ItemDefinition>;
  onSelectedFieldChange: (fieldId: string | null) => void;
};

export const FieldPlaceholder = ({
  itemDefinition,
  onSelectedFieldChange,
}: Props): ReactElement => {
  const { t } = useTranslation("definition");

  const handleClick = () => {
    const field = itemDefinition.addNewField(t("defaultFieldName"));
    onSelectedFieldChange(field.id);
  };

  return (
    <Button width="100%" onClick={handleClick} h={4}>
      <Text>{t("selectFieldDefinition")}</Text>
    </Button>
  );
};
