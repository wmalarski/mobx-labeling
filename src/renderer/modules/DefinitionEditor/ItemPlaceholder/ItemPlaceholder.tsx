import { Button, Text } from "@geist-ui/core";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ProjectDefinition } from "renderer/models";

type Props = {
  onSelectedItemChange: (itemId: string | null) => void;
  projectDefinition: Instance<typeof ProjectDefinition>;
};

export const ItemPlaceholder = ({
  onSelectedItemChange,
  projectDefinition,
}: Props): ReactElement => {
  const { t } = useTranslation("definition");

  const handleClick = () => {
    const item = projectDefinition.addNewItem(t("defaultItemName"));
    onSelectedItemChange(item.id);
  };

  return (
    <Button width="100%" onClick={handleClick} h={4}>
      <Text>{t("selectItemDefinition")}</Text>
    </Button>
  );
};
