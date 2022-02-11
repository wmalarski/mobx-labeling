import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ShapeDefinition } from "renderer/models/definition";

type Props = {
  fieldDefinition: Instance<typeof ShapeDefinition>;
};

export const ColorEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");
    return (
      <div>
        <p>{fieldDefinition.color}</p>
      </div>
    );
  }
);
