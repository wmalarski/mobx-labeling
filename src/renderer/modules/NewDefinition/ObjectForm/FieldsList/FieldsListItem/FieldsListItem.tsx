import { Col, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Link, useSearch } from "react-location";
import { FieldDefinition } from "renderer/models/definition";
import { LocationGenerics, routePaths } from "renderer/utils/routes";

type Props = {
  fieldDefinition: Instance<typeof FieldDefinition>;
};

export const FieldsListItem = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { objectId } = useSearch<LocationGenerics>();

    return (
      <Link
        to={routePaths.newDefinition}
        search={{ objectId, fieldId: fieldDefinition.id }}
      >
        <Col>
          <Text>{fieldDefinition.name}</Text>
          <Text>{fieldDefinition.description}</Text>
          <Text>{fieldDefinition.kind}</Text>
        </Col>
      </Link>
    );
  }
);
