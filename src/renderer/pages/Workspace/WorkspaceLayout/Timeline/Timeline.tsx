import { Grid } from "@geist-ui/core";
import * as FlexLayout from "flexlayout-react";
import Konva from "konva";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement, useRef } from "react";
import { Stage } from "react-konva";
import { WorkspaceStore } from "renderer/models";
import { useNodeResize } from "renderer/utils/konva";
import { ItemsLayer } from "./ItemsLayer/ItemsLayer";
import {
  defaultTimelineContext,
  TimelineContext,
  useXZoom,
} from "./Timeline.utils";
import { TimelineBar } from "./TimelineBar/TimelineBar";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  node: FlexLayout.TabNode;
};

export const Timeline = observer(
  ({ workspaceStore, node }: Props): ReactElement => {
    const stageRef = useRef<Konva.Stage>(null);

    const rect = node.getRect();

    useNodeResize({ node, stageRef });

    const zoom = useXZoom();

    console.log({ rect, zoom });

    return (
      <Grid.Container>
        <Grid xs={24}>
          <TimelineBar zoom={zoom} />
        </Grid>
        <Grid xs={24} style={{ backgroundColor: "white" }}>
          <Stage width={rect.width} height={rect.height}>
            <TimelineContext.Provider value={defaultTimelineContext}>
              <ItemsLayer
                workspaceStore={workspaceStore}
                scaleX={zoom.scaleX}
                stageX={zoom.stageX}
              />
            </TimelineContext.Provider>
          </Stage>
        </Grid>
      </Grid.Container>
    );
  }
);
