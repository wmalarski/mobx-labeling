import { Card } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { DraggableStateSnapshot } from "react-beautiful-dnd";
import { FieldDefinition } from "renderer/models/definition";

type Props = {
  stateSnapshot: DraggableStateSnapshot;
  fieldDefinition: Instance<typeof FieldDefinition>;
};

export const FieldListItem = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    return <Card>{fieldDefinition.name}</Card>;
  }
);
