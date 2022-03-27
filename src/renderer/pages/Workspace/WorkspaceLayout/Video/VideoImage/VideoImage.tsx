import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { observer } from "mobx-react-lite";
import { Instance, SnapshotOut } from "mobx-state-tree";
import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { Image } from "react-konva";
import { Resource, WorkspaceStore } from "renderer/models";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  resource: SnapshotOut<typeof Resource>;
  onClick: (event: KonvaEventObject<MouseEvent>) => void;
};

export const VideoImage = observer(
  ({ resource, workspaceStore, onClick }: Props): ReactElement => {
    const { path, fps = 24 } = resource;
    const currentFrame = workspaceStore.currentFrame.frame;

    const imageRef = useRef<Konva.Image | null>(null);
    const [size, setSize] = useState({ width: 50, height: 50 });

    const videoElement = useMemo(() => {
      const element = document.createElement("video");
      element.autoplay = false;
      element.src = path;
      return element;
    }, [path]);

    useEffect(() => {
      const onload = () => {
        setSize({
          width: videoElement.videoWidth,
          height: videoElement.videoHeight,
        });
        videoElement.currentTime = 0;

        const durationSeconds = videoElement.duration;
        const framesDuration = Math.floor(durationSeconds * fps);
        workspaceStore.updateFramesCount(framesDuration);
      };
      videoElement.addEventListener("loadedmetadata", onload);
      return () => {
        videoElement.removeEventListener("loadedmetadata", onload);
      };
    }, [fps, videoElement, workspaceStore]);

    // use Konva.Animation to redraw a layer
    useEffect(() => {
      if (!imageRef.current) return;

      const layer = imageRef.current?.getLayer();
      const anim = new Konva.Animation(() => void 0, layer);

      anim.start();
      return () => {
        anim.stop();
      };
    }, [videoElement]);

    useEffect(() => {
      videoElement.currentTime = currentFrame / fps;
    }, [currentFrame, fps, videoElement]);

    return (
      <Image
        ref={imageRef}
        image={videoElement}
        x={0}
        y={0}
        width={size.width}
        height={size.height}
        onClick={onClick}
      />
    );
  }
);
