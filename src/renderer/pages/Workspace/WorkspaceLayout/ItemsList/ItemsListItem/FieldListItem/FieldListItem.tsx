import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Field } from "renderer/models/project/Field";
import { Tool } from "renderer/models/project/Tool";
import { Box3dForm } from "./Box3dForm/Box3dForm";
import { CheckBoxForm } from "./CheckBoxForm/CheckBoxForm";
import { ComboBoxForm } from "./ComboBoxForm/ComboBoxForm";
import { EyeForm } from "./EyeForm/EyeForm";
import { GraphForm } from "./GraphForm/GraphForm";
import { LineForm } from "./LineForm/LineForm";
import { MultiSelectForm } from "./MultiSelectForm/MultiSelectForm";
import { NumberForm } from "./NumberForm/NumberForm";
import { PointForm } from "./PointForm/PointForm";
import { PolygonForm } from "./PolygonForm/PolygonForm";
import { RectangleForm } from "./RectangleForm/RectangleForm";
import { SelectForm } from "./SelectForm/SelectForm";
import { TextForm } from "./TextForm/TextForm";

type Props = {
  field: Instance<typeof Field>;
  tool: Instance<typeof Tool>;
};

export const FieldListItem = observer(
  ({ field, tool }: Props): ReactElement => {
    switch (field.kind) {
      case "Box3d":
        return <Box3dForm field={field} tool={tool} />;
      case "CheckBox":
        return <CheckBoxForm field={field} />;
      case "ComboBox":
        return <ComboBoxForm field={field} />;
      case "Eye":
        return <EyeForm field={field} />;
      case "Graph":
        return <GraphForm field={field} />;
      case "Line":
        return <LineForm field={field} />;
      case "MultiSelect":
        return <MultiSelectForm field={field} />;
      case "Number":
        return <NumberForm field={field} />;
      case "Point":
        return <PointForm field={field} />;
      case "Polygon":
        return <PolygonForm field={field} />;
      case "Rectangle":
        return <RectangleForm field={field} />;
      case "Select":
        return <SelectForm field={field} />;
      case "Text":
        return <TextForm field={field} />;
    }
  }
);
