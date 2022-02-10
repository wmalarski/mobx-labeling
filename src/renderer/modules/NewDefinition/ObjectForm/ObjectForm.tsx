import { Col } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { getSnapshot, Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { ObjectDefinition } from "renderer/models/definition";

type Props = {
  objectDefinition: Instance<typeof ObjectDefinition>;
};

export const ObjectForm = observer(
  ({ objectDefinition }: Props): ReactElement => {
    return (
      <Col>
        <p>ObjectForm</p>
        <pre>{JSON.stringify(getSnapshot(objectDefinition))}</pre>
      </Col>
    );
  }
);
