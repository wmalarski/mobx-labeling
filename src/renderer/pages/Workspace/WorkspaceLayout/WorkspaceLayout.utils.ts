import * as FlexLayout from "flexlayout-react";
import { SnapshotOut } from "mobx-state-tree";
import { Project } from "renderer/models";
import i18n from "renderer/utils/i18next";

export enum LayoutNodeKind {
  Items = "Items",
  Timeline = "Timeline",
  Video = "Video",
  Comments = "Comments",
}

export const getDefaultModel = (project: SnapshotOut<typeof Project>) => {
  return FlexLayout.Model.fromJson({
    global: {},
    borders: [
      {
        type: "border",
        location: "bottom",
        children: [
          {
            type: "tab",
            name: i18n.t<string>("timelineNode", { ns: "workspace" }),
            component: LayoutNodeKind.Timeline,
            enableClose: false,
          },
        ],
      },
      {
        type: "border",
        location: "right",
        children: [
          {
            type: "tab",
            name: i18n.t<string>("itemsNode", { ns: "workspace" }),
            component: LayoutNodeKind.Items,
            enableClose: false,
          },
          {
            type: "tab",
            name: i18n.t<string>("commentsNode", { ns: "workspace" }),
            component: LayoutNodeKind.Comments,
            enableClose: false,
          },
        ],
      },
    ],
    layout: {
      type: "row",
      weight: 200,
      children: project.resources.map((resource) => ({
        type: "tabset",
        weight: 100,
        children: [
          {
            type: "tab",
            name: resource.path,
            component: LayoutNodeKind.Video,
            enableClose: false,
            id: resource.id,
            config: resource,
          },
        ],
      })),
    },
  });
};
