import { Grid } from "@geist-ui/core";
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
      <Grid.Container gap={3}>
        <Grid xs={24}>
          <DefinitionForm
            definitionStore={definitionStore}
            onSelectedItemChange={setItemId}
          />
        </Grid>
        <Grid xs={24} sm={9} md={6}>
          <DndList
            projectDefinition={projectDefinition}
            onSelectedItemChange={setItemId}
            onSelectedFieldChange={setFieldId}
          />
        </Grid>
        <Grid xs={24} sm={15} md={18} direction="column">
          <Grid.Container gap={3}>
            {itemDefinition && (
              <>
                <Grid xs={24}>
                  <ItemForm
                    onSelectedItemChange={setItemId}
                    itemDefinition={itemDefinition}
                    projectDefinition={projectDefinition}
                    onSelectedFieldChange={setFieldId}
                  />
                </Grid>
                {fieldDefinition && (
                  <>
                    <Grid xs={24}>
                      <FieldForm
                        fieldDefinition={fieldDefinition}
                        itemDefinition={itemDefinition}
                        onSelectedFieldChange={setFieldId}
                      />
                    </Grid>
                    <Grid xs={24}>
                      <FieldEditor fieldDefinition={fieldDefinition} />
                    </Grid>
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
              <Grid xs={24}>
                <ItemPlaceholder
                  onSelectedItemChange={setItemId}
                  projectDefinition={projectDefinition}
                />
              </Grid>
            )}
            <Grid xs={24} style={{ flexGrow: 1 }} />
          </Grid.Container>
        </Grid>
      </Grid.Container>
    );
  }
);
