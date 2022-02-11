import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { CheckBoxDefinition } from "renderer/models/fields/checkBox";

type Props = {
  fieldDefinition: Instance<typeof CheckBoxDefinition>;
};

export const CheckBoxEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");
    return (
      <div>
        <p>{fieldDefinition.kind}</p>
      </div>
    );
  }
);
