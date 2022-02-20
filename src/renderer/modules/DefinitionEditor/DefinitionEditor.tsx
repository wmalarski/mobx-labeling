import { Container, Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement, useState } from "react";
import { Flex } from "renderer/components";
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
      <Container gap={0} fluid>
        <DefinitionForm definitionStore={definitionStore} />
        <Spacer y={1} />
        <Flex gap="xl" direction="row">
          <Flex gap="xl" direction="column">
            <DndList
              projectDefinition={projectDefinition}
              onSelectedItemChange={setItemId}
              onSelectedFieldChange={setFieldId}
            />
          </Flex>
          <Flex gap="lg" direction="column" css={{ width: "100%" }}>
            {itemDefinition && (
              <>
                <ItemForm
                  onSelectedItemChange={setItemId}
                  itemDefinition={itemDefinition}
                  projectDefinition={projectDefinition}
                  onSelectedFieldChange={setFieldId}
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
          </Flex>
        </Flex>
      </Container>
    );
  }
);
