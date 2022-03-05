import { Grid, Spacer } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement, useState } from "react";
import { DefinitionStore } from "renderer/models";
import { DefinitionForm } from "./DefinitionForm/DefinitionForm";
import { DndList } from "./DndList/DndList";
import { FieldEditor } from "./FieldEditor/FieldEditor";
import { FieldForm } from "./FieldForm/FieldForm";
import { FieldPlaceholder } from "./FieldPlaceholder/FieldPlaceholder";
import { ItemForm } from "./ItemForm/ItemForm";
import { ItemPlaceholder } from "./ItemPlaceholder/ItemPlaceholder";

type Props = {
  definitionStore: Instance<typeof DefinitionStore>;
};

export const DefinitionEditor = observer(
  ({ definitionStore }: Props): ReactElement => {
    const [itemId, setItemId] = useState<string | null>(null);
    const [fieldId, setFieldId] = useState<string | null>(null);

    const projectDefinition = definitionStore.projectDefinition;
    const itemDefinition = itemId ? projectDefinition.item(itemId) : null;
    const fieldDefinition = fieldId ? itemDefinition?.field(fieldId) : null;

    return (
      <Grid>
        <DefinitionForm
          definitionStore={definitionStore}
          onSelectedItemChange={setItemId}
        />
        <Spacer h={2} />
        <Grid direction="row">
          <Grid direction="column">
            <DndList
              projectDefinition={projectDefinition}
              onSelectedItemChange={setItemId}
              onSelectedFieldChange={setFieldId}
            />
          </Grid>
          <Grid direction="column" css={{ width: "100%" }}>
            {itemDefinition && (
              <>
                <ItemForm
                  onSelectedItemChange={setItemId}
                  itemDefinition={itemDefinition}
                  projectDefinition={projectDefinition}
                  onSelectedFieldChange={setFieldId}
                />
                <Spacer h={0.5} />
                {fieldDefinition && (
                  <>
                    <FieldForm
                      fieldDefinition={fieldDefinition}
                      itemDefinition={itemDefinition}
                      onSelectedFieldChange={setFieldId}
                    />
                    <Spacer h={0.5} />
                    <FieldEditor fieldDefinition={fieldDefinition} />
                    <Spacer h={1} />
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
      </Grid>
    );
  }
);
