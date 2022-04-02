import { Grid, useTheme } from "@geist-ui/core";
import * as FlexLayout from "flexlayout-react";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement, useRef } from "react";
import { Stage } from "react-konva";
import { WorkspaceStore } from "renderer/models";
import { useNodeResize } from "renderer/utils/konva";
import { ItemsLayer } from "./ItemsLayer/ItemsLayer";
import { LabelsLayer } from "./LabelsLayer/LabelsLayer";
import { useXZoom } from "./Timeline.utils";
import { TimelineBar } from "./TimelineBar/TimelineBar";
import {
  TimelineContextProvider,
  TimelineLabelsWidth,
} from "./TimelineContext/TimelineContext";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  node: FlexLayout.TabNode;
};

export const Timeline = observer(
  ({ workspaceStore, node }: Props): ReactElement => {
    const theme = useTheme();

    const stageRef = useRef<Konva.Stage>(null);

    const rect = node.getRect();

    useNodeResize({ node, stageRef });

    const zoom = useXZoom();

    const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
      e.evt.preventDefault();

      const stage = e.target.getStage();
      const point = stage?.getPointerPosition();

      if (!point) return;

      zoom.dispatch({
        type: e.evt.deltaY < 0 ? "zoomIn" : "zoomOut",
        x: point.x - TimelineLabelsWidth,
      });
    };

    return (
      <Grid.Container>
        <Grid xs={24}>
          <TimelineBar zoom={zoom} />
        </Grid>
        <Grid xs={24}>
          <Stage width={rect.width} height={rect.height} onWheel={handleWheel}>
            <TimelineContextProvider theme={theme}>
              <LabelsLayer workspaceStore={workspaceStore} />
              <ItemsLayer workspaceStore={workspaceStore} zoom={zoom} />
            </TimelineContextProvider>
          </Stage>
        </Grid>
      </Grid.Container>
    );
  }
);
