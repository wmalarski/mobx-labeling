import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { SelectDefinition } from "renderer/models/fields/select";

type Props = {
  fieldDefinition: Instance<typeof SelectDefinition>;
};

export const SelectEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");
    return (
      <div>
        <p>{fieldDefinition.kind}</p>
      </div>
    );
  }
);
