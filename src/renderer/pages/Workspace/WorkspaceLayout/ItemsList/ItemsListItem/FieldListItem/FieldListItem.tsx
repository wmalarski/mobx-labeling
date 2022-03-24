import { observer } from "mobx-react-lite";
import { getSnapshot, Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Field } from "renderer/models/project/Field";
import { PolygonForm } from "./PolygonForm/PolygonForm";
import { RectangleForm } from "./RectangleForm/RectangleForm";
import { SelectForm } from "./SelectForm/SelectForm";
import { TextForm } from "./TextForm/TextForm";

type Props = {
  field: Instance<typeof Field>;
};

export const FieldListItem = observer(({ field }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  switch (field.kind) {
    case "Polygon":
      return <PolygonForm field={field} />;
    case "Rectangle":
      return <RectangleForm rectangleField={field} />;
    case "Select":
      return <SelectForm selectField={field} />;
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
