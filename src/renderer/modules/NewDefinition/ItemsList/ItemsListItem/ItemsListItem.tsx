import { Col, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Link } from "react-location";
import { ItemDefinition } from "renderer/models/definition";
import { routePaths } from "renderer/utils/routes";

type Props = {
  itemDefinition: Instance<typeof ItemDefinition>;
};

export const ItemsListItem = observer(
  ({ itemDefinition }: Props): ReactElement => {
    return (
      <Link
        to={routePaths.newDefinition}
        search={{ itemId: itemDefinition.id }}
      >
        <Col>
          <Text>{itemDefinition.name}</Text>
          <Text small color="$accents7">
            {itemDefinition.description}
          </Text>
        </Col>
      </Link>
    );
  }
);
