import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { FieldDefinition } from "renderer/models/definition";

type Props = {
  fieldDefinition: Instance<typeof FieldDefinition>;
};

export const FieldEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    return (
      <div>
        <p>{fieldDefinition.kind}</p>
      </div>
    );
  }
);
