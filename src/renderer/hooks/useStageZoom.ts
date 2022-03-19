import { KonvaEventObject } from "konva/lib/Node";
import { useCallback, useState } from "react";
import { Point2D } from "renderer/utils/geometry";

type UseZoomState = {
  stageScale: number;
  stageX: number;
  stageY: number;
};

export type UseZoomResult = UseZoomState & {
  handleWheel: (evt: KonvaEventObject<WheelEvent>) => void;
  handleReset: () => void;
  handleZoomIn: (center: Point2D) => void;
  handleZoomOut: (center: Point2D) => void;
  handleSetScale: (scale: number, center: Point2D) => void;
};

type UseZoomArgs = {
  scaleBy: number;
};

const getNewZoomState = (
  newScale: number,
  point: Point2D,
  old: UseZoomState
): UseZoomState => {
  const { stageX, stageY, stageScale } = old;
  const mouseX = point.x / stageScale - stageX / stageScale;
  const mouseY = point.y / stageScale - stageY / stageScale;
  const newStageX = -(mouseX - point.x / newScale) * newScale;
  const newStageY = -(mouseY - point.y / newScale) * newScale;
  return { stageScale: newScale, stageX: newStageX, stageY: newStageY };
};

const defaultZoomState: UseZoomState = { stageScale: 1, stageX: 0, stageY: 0 };

export const useStageZoom = ({ scaleBy }: UseZoomArgs): UseZoomResult => {
  const [state, setState] = useState<UseZoomState>(defaultZoomState);

  const changeZoom = useCallback(
    (isZoomIn: boolean, point: Point2D): void => {
      setState((value) => {
        return getNewZoomState(
          isZoomIn ? value.stageScale * scaleBy : value.stageScale / scaleBy,
          point,
          value
        );
      });
    },
    [scaleBy]
  );

  const handleWheel = useCallback(
    (e) => {
      e.evt.preventDefault();

      const stage = e.target.getStage();
      const point = stage.getPointerPosition();

      changeZoom(e.evt.deltaY < 0, point);
    },
    [changeZoom]
  );

  const handleReset = useCallback((): void => {
    setState({
      stageScale: 1,
      stageX: 0,
      stageY: 0,
    });
  }, []);

  const handleZoomIn = useCallback(
    (center: Point2D): void => {
      changeZoom(true, center);
    },
    [changeZoom]
  );

  const handleZoomOut = useCallback(
    (center: Point2D): void => {
      changeZoom(false, center);
    },
    [changeZoom]
  );

  const handleSetScale = useCallback(
    (newScale: number, center: Point2D): void =>
      setState((value) => {
        return getNewZoomState(newScale, center, value);
      }),
    []
  );

  return {
    handleWheel,
    handleReset,
    handleZoomIn,
    handleZoomOut,
    handleSetScale,
    ...state,
  };
};
