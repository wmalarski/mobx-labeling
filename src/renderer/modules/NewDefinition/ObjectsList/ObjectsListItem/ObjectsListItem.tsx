import { Col, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { ObjectDefinition } from "renderer/models/definition";

type Props = {
  objectDefinition: Instance<typeof ObjectDefinition>;
};

export const ObjectsListItem = observer(
  ({ objectDefinition }: Props): ReactElement => {
    return (
      <Col>
        <Text>{objectDefinition.name}</Text>
        <Text small color="$accents7">
          {objectDefinition.description}
        </Text>
      </Col>
    );
  }
);
