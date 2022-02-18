import { Container, Grid, Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement, useState } from "react";
import { ProjectDefinition } from "renderer/models";
import { DefinitionForm } from "./DefinitionForm/DefinitionForm";
import { DndList } from "./DndList/DndList";
import { FieldEditor } from "./FieldEditor/FieldEditor";
import { FieldForm } from "./FieldForm/FieldForm";
import { FieldPlaceholder } from "./FieldPlaceholder/FieldPlaceholder";
import { ItemForm } from "./ItemForm/ItemForm";
import { ItemPlaceholder } from "./ItemPlaceholder/ItemPlaceholder";

type Props = {
  projectDefinition: Instance<typeof ProjectDefinition>;
};

export const DefinitionEditor = observer(
  ({ projectDefinition }: Props): ReactElement => {
    const [itemId, setItemId] = useState<string | null>(null);
    const [fieldId, setFieldId] = useState<string | null>(null);

    const itemDefinition = itemId ? projectDefinition.item(itemId) : null;
    const fieldDefinition = fieldId ? itemDefinition?.field(fieldId) : null;

    return (
      <Container gap={0}>
        <DefinitionForm projectDefinition={projectDefinition} />
        <Spacer y={1} />
        <Grid css={{ display: "flex", gap: "$xl" }} direction="row">
          <Grid css={{ display: "flex", gap: "$xl" }} direction="column">
            <DndList
              projectDefinition={projectDefinition}
              onSelectedItemChange={setItemId}
              onSelectedFieldChange={setFieldId}
            />
          </Grid>
          <Grid
            css={{ display: "flex", gap: "$lg", width: "100%" }}
            direction="column"
          >
            {itemDefinition && (
              <>
                <ItemForm
                  onSelectedItemChange={setItemId}
                  itemDefinition={itemDefinition}
                  projectDefinition={projectDefinition}
                />
                {fieldDefinition && (
                  <>
                    <FieldForm
                      fieldDefinition={fieldDefinition}
                      itemDefinition={itemDefinition}
                      onSelectedFieldChange={setFieldId}
                    />
                    <FieldEditor fieldDefinition={fieldDefinition} />
                  </>
                )}
                {!fieldDefinition && (
                  <FieldPlaceholder
                    itemDefinition={itemDefinition}
                    onSelectedFieldChange={setFieldId}
                  />
                )}
              </>
            )}
            {!itemDefinition && (
              <ItemPlaceholder
                onSelectedItemChange={setItemId}
                projectDefinition={projectDefinition}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    );
  }
);
