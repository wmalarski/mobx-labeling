import { Grid, useTheme } from "@geist-ui/core";
import * as FlexLayout from "flexlayout-react";
import Konva from "konva";
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
import { TimelineContextProvider } from "./TimelineContext/TimelineContext";

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

    return (
      <Grid.Container>
        <Grid xs={24}>
          <TimelineBar zoom={zoom} />
        </Grid>
        <Grid xs={24}>
          <Stage width={rect.width} height={rect.height}>
            <TimelineContextProvider theme={theme}>
              <ItemsLayer
                workspaceStore={workspaceStore}
                scaleX={zoom.scaleX}
                stageX={zoom.stageX}
              />
              <LabelsLayer workspaceStore={workspaceStore} />
            </TimelineContextProvider>
          </Stage>
        </Grid>
      </Grid.Container>
    );
  }
);
