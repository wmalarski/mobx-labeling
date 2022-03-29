import * as FlexLayout from "flexlayout-react";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { observer } from "mobx-react-lite";
import { Instance, SnapshotOut } from "mobx-state-tree";
import { ReactElement, useRef } from "react";
import { Circle, Layer, Rect, Stage } from "react-konva";
import { Resource, ToolKind, WorkspaceStore } from "renderer/models";
import { useNodeResize } from "renderer/utils/konva";
import * as Styles from "./Video.styles";
import { useZoom } from "./Video.utils";
import { VideoImage } from "./VideoImage/VideoImage";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  node: FlexLayout.TabNode;
};

export const Video = observer(
  ({ node, workspaceStore }: Props): ReactElement => {
    const stageRef = useRef<Konva.Stage>(null);

    const resource: SnapshotOut<typeof Resource> = node.getConfig();
    const rect = node.getRect();

    useNodeResize({ stageRef, node });

    const { stageScale, stageX, stageY, dispatch } = useZoom();

    const handleImageClick = () => {
      //
    };

    const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
      e.evt.preventDefault();

      const stage = e.target.getStage();
      const point = stage?.getPointerPosition();

      if (!point) return;

      dispatch({ type: e.evt.deltaY < 0 ? "zoomIn" : "zoomOut", point });
    };

    return (
      <Styles.Container>
        <Stage
          ref={stageRef}
          width={rect.width}
          height={rect.height}
          onWheel={handleWheel}
          scaleX={stageScale}
          scaleY={stageScale}
          x={stageX}
          y={stageY}
        >
          <Layer draggable={workspaceStore.tool.kind === ToolKind.Drag}>
            <VideoImage
              onClick={handleImageClick}
              resource={resource}
              workspaceStore={workspaceStore}
            />
            <Rect width={50} height={50} fill="red" />
            <Circle x={200} y={200} stroke="white" radius={50} />
          </Layer>
        </Stage>
      </Styles.Container>
    );
  }
);
