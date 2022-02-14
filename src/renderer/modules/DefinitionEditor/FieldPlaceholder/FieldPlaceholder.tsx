import { Card, Text } from "@nextui-org/react";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ItemDefinition } from "renderer/models/definition";

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
    <Card
      clickable
      onClick={handleClick}
      css={{
        height: "$40",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>{t("selectFieldDefinition")}</Text>
    </Card>
  );
};
