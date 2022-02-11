import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { NumberDefinition } from "renderer/models/fields/number";

type Props = {
  fieldDefinition: Instance<typeof NumberDefinition>;
};

export const NumberEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");
    return (
      <div>
        <p>{fieldDefinition.kind}</p>
      </div>
    );
  }
);
