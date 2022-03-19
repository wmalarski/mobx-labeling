import * as FlexLayout from "flexlayout-react";
import Konva from "konva";
import { Instance, SnapshotOut } from "mobx-state-tree";
import { ReactElement, useRef } from "react";
import { Circle, Layer, Rect, Stage } from "react-konva";
import { useStageZoom } from "renderer/hooks";
import { Resource, WorkspaceStore } from "renderer/models";
import * as Styles from "./Video.styles";
import { useVideoResize } from "./Video.utils";
import { VideoImage } from "./VideoImage/VideoImage";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  node: FlexLayout.TabNode;
};

export const Video = ({ node, workspaceStore }: Props): ReactElement => {
  const stageRef = useRef<Konva.Stage>(null);

  const resource: SnapshotOut<typeof Resource> = node.getConfig();
  const rect = node.getRect();

  useVideoResize({ stageRef, node });

  const { handleWheel, stageScale, stageX, stageY } = useStageZoom({
    scaleBy: 1.1,
  });

  const handleImageClick = () => {
    //
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
        <Layer>
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
};
