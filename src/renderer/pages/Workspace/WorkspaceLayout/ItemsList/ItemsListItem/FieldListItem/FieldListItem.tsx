import { observer } from "mobx-react-lite";
import { getSnapshot, Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Field } from "renderer/models/project/Field";
import { TextForm } from "./TextForm/TextForm";

type Props = {
  field: Instance<typeof Field>;
};

export const FieldListItem = observer(({ field }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  switch (field.kind) {
    case "Text":
      return <TextForm textField={field} />;
    default:
      return (
        <div>
          <p>{t("FieldListItem")}</p>
          <pre>
            {JSON.stringify(
              {
                field: getSnapshot(field),
                definition: getSnapshot(field.definition),
              },
              null,
              2
            )}
          </pre>
        </div>
      );
  }
});
