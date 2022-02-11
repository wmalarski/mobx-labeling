import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { MultiSelectDefinition } from "renderer/models/fields/multiSelect";

type Props = {
  fieldDefinition: Instance<typeof MultiSelectDefinition>;
};

export const MultiSelectEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");
    return (
      <div>
        <p>{fieldDefinition.kind}</p>
      </div>
    );
  }
);
