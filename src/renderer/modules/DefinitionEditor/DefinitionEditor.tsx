import { Card, Container, Grid, Spacer, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProjectDefinition } from "renderer/models/definition";
import { DefinitionForm } from "./DefinitionForm/DefinitionForm";
import { FieldEditor } from "./FieldEditor/FieldEditor";
import { FieldForm } from "./FieldForm/FieldForm";
import { FieldsList } from "./FieldsList/FieldsList";
import { ItemForm } from "./ItemForm/ItemForm";
import { ItemsList } from "./ItemsList/ItemsList";

type Props = {
  projectDefinition: Instance<typeof ProjectDefinition>;
};

export const DefinitionEditor = observer(
  ({ projectDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const [itemId, setItemId] = useState<string | null>(null);
    const [fieldId, setFieldId] = useState<string | null>(null);

    const itemDefinition = projectDefinition.items.find(
      (item) => item.id === itemId
    );

    const fieldDefinition = itemDefinition?.fields.find(
      (field) => field.id === fieldId
    );

    return (
      <Container gap={0}>
        <DefinitionForm projectDefinition={projectDefinition} />
        <Spacer y={1} />
        <Grid css={{ display: "flex", gap: "$xl" }} direction="row">
          <Grid css={{ display: "flex", gap: "$xl" }} direction="column">
            <ItemsList
              projectDefinition={projectDefinition}
              onItemClick={setItemId}
            />
            {itemDefinition && (
              <FieldsList
                itemDefinition={itemDefinition}
                onFieldClick={setFieldId}
              />
            )}
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
                  <Card>
                    <Text>{t("selectFieldDefinition")}</Text>
                  </Card>
                )}
              </>
            )}
            {!itemDefinition && (
              <Card>
                <Text>{t("selectItemDefinition")}</Text>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    );
  }
);
