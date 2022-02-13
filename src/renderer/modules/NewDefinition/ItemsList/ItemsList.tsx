import { Button, Col, Row, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ProjectDefinition } from "renderer/models/definition";
import { ItemsListItem } from "./ItemsListItem/ItemsListItem";

type Props = {
  projectDefinition: Instance<typeof ProjectDefinition>;
};

export const ItemList = observer(
  ({ projectDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handlePlusClick = () => {
      projectDefinition.addNewItem(t("defaultItemName"));
    };

    return (
      <Col>
        <Row>
          <Text h2>{t("definitionItems")}</Text>
          <Button auto onClick={handlePlusClick}>
            {t("addNewItem")}
          </Button>
        </Row>
        <Col>
          {projectDefinition.items.map((itemDefinition) => (
            <ItemsListItem
              key={itemDefinition.id}
              itemDefinition={itemDefinition}
            />
          ))}
        </Col>
      </Col>
    );
  }
);
