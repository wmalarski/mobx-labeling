import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Item } from "renderer/models";
import { FieldListItem } from "./FieldListItem/FieldListItem";

type Props = {
  item: Instance<typeof Item>;
};

export const ItemsListItem = observer(({ item }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  return (
    <div>
      <p>{t("ItemsListItem")}</p>
      {item.fields.map((field) => (
        <FieldListItem key={field.id} field={field} />
      ))}
    </div>
  );
});
