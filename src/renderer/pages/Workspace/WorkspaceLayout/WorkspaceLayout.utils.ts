import * as FlexLayout from "flexlayout-react";
import { IJsonTabSetNode } from "flexlayout-react";
import { SnapshotOut } from "mobx-state-tree";
import { Project } from "renderer/models/project/Project";
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
          },
          {
            type: "tab",
            name: i18n.t<string>("commentsNode", { ns: "workspace" }),
            component: LayoutNodeKind.Comments,
          },
        ],
      },
    ],
    layout: {
      type: "row",
      weight: 200,
      children: project.resources.map(
        (resource): IJsonTabSetNode => ({
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
        })
      ),
    },
  });
};
