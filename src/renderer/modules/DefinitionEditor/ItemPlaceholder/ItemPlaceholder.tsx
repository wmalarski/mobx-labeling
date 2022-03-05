import { Card, Text } from "@geist-ui/core";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ProjectDefinition } from "renderer/models";

type Props = {
  projectDefinition: Instance<typeof ProjectDefinition>;
  onSelectedItemChange: (itemId: string | null) => void;
};

export const ItemPlaceholder = ({
  projectDefinition,
  onSelectedItemChange,
}: Props): ReactElement => {
  const { t } = useTranslation("definition");

  const handleClick = () => {
    const item = projectDefinition.addNewItem(t("defaultItemName"));
    onSelectedItemChange(item.id);
  };

  return (
    <Card
      onClick={handleClick}
      css={{
        height: "$40",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>{t("selectItemDefinition")}</Text>
    </Card>
  );
};
