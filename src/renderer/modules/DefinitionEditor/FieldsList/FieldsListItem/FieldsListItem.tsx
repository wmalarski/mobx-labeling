import { Button, Container, Row, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { FieldDefinition } from "renderer/models/definition";

type Props = {
  fieldDefinition: Instance<typeof FieldDefinition>;
  onFieldClick: () => void;
};

export const FieldsListItem = observer(
  ({ fieldDefinition, onFieldClick }: Props): ReactElement => {
    return (
      <Button color="success" onClick={onFieldClick}>
        <Container gap={0}>
          <Row>
            <Text>{fieldDefinition.name}</Text>
          </Row>
          <Row>
            <Text small>{fieldDefinition.description}</Text>
          </Row>
          <Row>
            <Text small>{fieldDefinition.kind}</Text>
          </Row>
        </Container>
      </Button>
    );
  }
);
