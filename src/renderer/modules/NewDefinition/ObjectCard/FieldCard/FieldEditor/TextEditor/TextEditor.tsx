import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { TextDefinition } from "renderer/models/fields/text";

type Props = {
  fieldDefinition: Instance<typeof TextDefinition>;
};

export const TextEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");
    return (
      <div>
        <p>{fieldDefinition.kind}</p>
      </div>
    );
  }
);
