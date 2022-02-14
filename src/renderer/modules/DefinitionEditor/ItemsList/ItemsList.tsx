import { Button, Container, Row, Spacer, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { Fragment, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ProjectDefinition } from "renderer/models/definition";
import { ItemsListItem } from "./ItemsListItem/ItemsListItem";

type Props = {
  projectDefinition: Instance<typeof ProjectDefinition>;
  onSelectedItemChange: (itemId: string | null) => void;
};

export const ItemsList = observer(
  ({ projectDefinition, onSelectedItemChange }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handlePlusClick = () => {
      const item = projectDefinition.addNewItem(t("defaultItemName"));
      onSelectedItemChange(item.id);
    };

    const handleItemClick = (itemId: string) => () => {
      onSelectedItemChange(itemId);
    };

    return (
      <Container gap={0}>
        <Row>
          <Text h2>{t("definitionItems")}</Text>
          <Spacer y={0.5} />
          <Button auto rounded onClick={handlePlusClick}>
            {t("addNewItem")}
          </Button>
        </Row>
        {projectDefinition.items.map((itemDefinition) => (
          <Fragment key={itemDefinition.id}>
            <Spacer y={0.5} />
            <Row>
              <ItemsListItem
                itemDefinition={itemDefinition}
                onItemClick={handleItemClick(itemDefinition.id)}
              />
            </Row>
          </Fragment>
        ))}
      </Container>
    );
  }
);
