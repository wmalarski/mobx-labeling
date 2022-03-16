import * as FlexLayout from "flexlayout-react";

export enum LayoutNodeKind {
  ItemsList = "ItemsList",
}

export const getDefaultModel = () => {
  return FlexLayout.Model.fromJson({
    global: {},
    borders: [],
    layout: {
      type: "row",
      weight: 200,
      children: [
        {
          type: "tabset",
          weight: 100,
          children: [
            {
              type: "tab",
              name: "One",
              component: "button",
            },
          ],
        },
        {
          type: "tabset",
          weight: 100,
          children: [
            {
              type: "tab",
              name: "Items List",
              component: LayoutNodeKind.ItemsList,
            },
          ],
        },
      ],
    },
  });
};
