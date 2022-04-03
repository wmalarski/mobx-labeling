import { Description, Table } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Field, FieldDefinition, Item, Tool } from "renderer/models";
import { FieldListItem } from "./FieldListItem/FieldListItem";

type Props = {
  item: Instance<typeof Item>;
  tool: Instance<typeof Tool>;
};

export const ItemsListItem = observer(({ item, tool }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  const renderKey = useCallback(
    (definition: Instance<typeof FieldDefinition>) => (
      <Description title={definition.name} content={definition.description} />
    ),
    []
  );

  const renderValue = useCallback(
    (field: Instance<typeof Field>) => (
      <FieldListItem key={field.id} field={field} tool={tool} />
    ),
    [tool]
  );

  const data = item.fields.map((field) => ({
    field,
    definition: field.definition,
  }));

  return (
    <Table hover={false} data={data}>
      <Table.Column
        label={t("itemTableKey")}
        prop="definition"
        render={renderKey}
      />
      <Table.Column
        label={t("itemTableValue")}
        prop="field"
        render={renderValue}
      />
    </Table>
  );
});
