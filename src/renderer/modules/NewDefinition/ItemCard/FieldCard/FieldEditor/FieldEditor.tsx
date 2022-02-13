import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { FieldDefinition } from "renderer/models/definition";
import { CheckBoxEditor } from "./CheckBoxEditor/CheckBoxEditor";
import { ColorEditor } from "./ColorEditor/ColorEditor";
import { ComboBoxEditor } from "./ComboBoxEditor/ComboBoxEditor";
import { MultiSelectEditor } from "./MultiSelectEditor/MultiSelectEditor";
import { NumberEditor } from "./NumberEditor/NumberEditor";
import { SelectEditor } from "./SelectEditor/SelectEditor";
import { TextEditor } from "./TextEditor/TextEditor";

type Props = {
  fieldDefinition: Instance<typeof FieldDefinition>;
};

export const FieldEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    switch (fieldDefinition.kind) {
      case "Box3d":
      case "Eye":
      case "Graph":
      case "Line":
      case "Point":
      case "Polygon":
      case "Rectangle":
        return <ColorEditor fieldDefinition={fieldDefinition} />;
      case "CheckBox":
        return <CheckBoxEditor fieldDefinition={fieldDefinition} />;
      case "ComboBox":
        return <ComboBoxEditor fieldDefinition={fieldDefinition} />;
      case "MultiSelect":
        return <MultiSelectEditor fieldDefinition={fieldDefinition} />;
      case "Number":
        return <NumberEditor fieldDefinition={fieldDefinition} />;
      case "Select":
        return <SelectEditor fieldDefinition={fieldDefinition} />;
      case "Text":
        return <TextEditor fieldDefinition={fieldDefinition} />;
    }
  }
);
