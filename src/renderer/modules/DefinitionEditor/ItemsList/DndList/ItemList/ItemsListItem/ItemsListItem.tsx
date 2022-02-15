import { Card, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ItemDefinition } from "renderer/models/definition";
import { FieldList } from "./FieldList/FieldList";

type Props = {
  itemDefinition: Instance<typeof ItemDefinition>;
};

export const ItemsListItem = observer(
  ({ itemDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    return (
      <Card>
        <Text>{itemDefinition.name}</Text>
        {itemDefinition.description ? (
          <Text small>{itemDefinition.description}</Text>
        ) : (
          <Text small color="$accents6">
            {t("descriptionPlaceholder")}
          </Text>
        )}
        <FieldList itemDefinition={itemDefinition} />
      </Card>
    );
  }
);
