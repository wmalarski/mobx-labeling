import * as FlexLayout from "flexlayout-react";
import Konva from "konva";
import { RefObject, useEffect, useReducer } from "react";
import { Point2D } from "renderer/utils/geometry";

type UseVideoResizeArgs = {
  stageRef: RefObject<Konva.Stage>;
  node: FlexLayout.TabNode;
};

export const useVideoResize = ({
  stageRef,
  node,
}: UseVideoResizeArgs): void => {
  useEffect(() => {
    node.setEventListener("resize", () => {
      if (!stageRef.current) return;
      const resized = node.getRect();
      stageRef.current.width(resized.width);
      stageRef.current.height(resized.height);
    });
    return () => {
      node.removeEventListener("resize");
    };
  }, [node, stageRef]);
};

type UseZoomState = {
  stageScale: number;
  stageX: number;
  stageY: number;
  scaleBy: number;
};

export type UseZoomResult = UseZoomState & {
  dispatch: (action: UseZoomAction) => void;
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
  return { ...old, stageScale: newScale, stageX: newStageX, stageY: newStageY };
};

const defaultZoomState: UseZoomState = {
  stageScale: 1,
  stageX: 0,
  stageY: 0,
  scaleBy: 1.1,
};

type UseZoomAction =
  | {
      type: "reset";
    }
  | {
      type: "zoomIn";
      point: Point2D;
    }
  | {
      type: "zoomOut";
      point: Point2D;
    }
  | {
      type: "set";
      point: Point2D;
      scale: number;
    };

const reducer = (state: UseZoomState, action: UseZoomAction): UseZoomState => {
  switch (action.type) {
    case "reset":
      return defaultZoomState;
    case "zoomIn":
      return getNewZoomState(
        state.stageScale * state.scaleBy,
        action.point,
        state
      );
    case "zoomOut":
      return getNewZoomState(
        state.stageScale / state.scaleBy,
        action.point,
        state
      );
    case "set":
      return getNewZoomState(action.scale, action.point, state);
  }
};

export const useZoom = (): UseZoomResult => {
  const [state, dispatch] = useReducer(reducer, defaultZoomState);

  return { dispatch, ...state };
};
