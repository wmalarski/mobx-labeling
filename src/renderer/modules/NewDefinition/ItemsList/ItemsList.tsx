import { Button, Container, Row, Spacer, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { Fragment, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ProjectDefinition } from "renderer/models/definition";
import { ItemsListItem } from "./ItemsListItem/ItemsListItem";

type Props = {
  projectDefinition: Instance<typeof ProjectDefinition>;
  onItemClick: (itemId: string | null) => void;
};

export const ItemsList = observer(
  ({ projectDefinition, onItemClick }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handlePlusClick = () => {
      projectDefinition.addNewItem(t("defaultItemName"));
    };

    const handleItemClick = (itemId: string) => () => {
      onItemClick(itemId);
    };

    return (
      <Container gap={0}>
        <Row>
          <Text h2>{t("definitionItems")}</Text>
          <Spacer y={0.5} />
          <Button auto onClick={handlePlusClick}>
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
