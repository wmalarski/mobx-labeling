import { Button, Col, Row, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ProjectDefinition } from "renderer/models/definition";
import { ObjectsListItem } from "./ObjectsListItem/ObjectsListItem";

type Props = {
  definition: Instance<typeof ProjectDefinition>;
};

export const ObjectsList = observer(({ definition }: Props): ReactElement => {
  const { t } = useTranslation("definition");

  const handlePlusClick = () => {
    definition.addNewObject(t("defaultObjectName"));
  };

  return (
    <Col>
      <Row>
        <Text h2>{t("definitionObjects")}</Text>
        <Button auto onClick={handlePlusClick}>
          Plus
        </Button>
      </Row>
      <Col>
        {definition.objects.map((objectDefinition) => (
          <ObjectsListItem
            key={objectDefinition.id}
            objectDefinition={objectDefinition}
          />
        ))}
      </Col>
    </Col>
  );
});
