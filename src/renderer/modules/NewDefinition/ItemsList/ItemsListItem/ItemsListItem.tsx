import { Button, Container, Row, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { ItemDefinition } from "renderer/models/definition";

type Props = {
  itemDefinition: Instance<typeof ItemDefinition>;
  onItemClick: () => void;
};

export const ItemsListItem = observer(
  ({ itemDefinition, onItemClick }: Props): ReactElement => {
    return (
      <Button onClick={onItemClick}>
        <Container gap={0}>
          <Row>
            <Text>{itemDefinition.name}</Text>
          </Row>
          <Row>
            <Text small color="$accents7">
              {itemDefinition.description}
            </Text>
          </Row>
        </Container>
      </Button>
    );
  }
);
