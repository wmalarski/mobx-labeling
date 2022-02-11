import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { FieldDefinition } from "renderer/models/definition";

type Props = {
  fieldDefinition: Instance<typeof FieldDefinition>;
};

export const FieldForm = ({ fieldDefinition }: Props): ReactElement => {
  const { t } = useTranslation("common");
  return (
    <div>
      <p>FieldForm</p>
    </div>
  );
};
