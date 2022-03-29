import { createContext, useContext, useReducer } from "react";
import { optionalClamp } from "renderer/utils/geometry";

export const labelsWidth = 160;

export type UseXZoomState = {
  scaleX: number;
  stageX: number;
  step: number;
  min: number;
  max: number;
};

type UseXZoomAction =
  | {
      type: "reset";
    }
  | {
      type: "zoomIn";
      x: number;
    }
  | {
      type: "zoomOut";
      x: number;
    }
  | {
      type: "set";
      scale: number;
      x: number;
    };

export type UseXZoomResult = UseXZoomState & {
  dispatch: (action: UseXZoomAction) => void;
};

const getNewXZoomState = (
  newScaleX: number,
  x: number,
  state: UseXZoomState
): UseXZoomState => {
  const clamped = optionalClamp(newScaleX, state.min, state.max);
  const mouseX = x / state.scaleX - state.stageX / state.scaleX;
  const newStageX = -(mouseX - x / clamped) * clamped;
  return { ...state, scaleX: clamped, stageX: newStageX };
};

const defaultXZoomState: UseXZoomState = {
  scaleX: 1,
  stageX: 0,
  max: 5,
  min: 0.1,
  step: 0.1,
};

const reducer = (
  state: UseXZoomState,
  action: UseXZoomAction
): UseXZoomState => {
  switch (action.type) {
    case "reset":
      return defaultXZoomState;
    case "zoomIn":
      return getNewXZoomState(state.scaleX - state.step, action.x, state);
    case "zoomOut":
      return getNewXZoomState(state.scaleX + state.step, action.x, state);
    case "set":
      return getNewXZoomState(action.scale, action.x, state);
  }
};

export const useXZoom = (): UseXZoomResult => {
  const [state, dispatch] = useReducer(reducer, defaultXZoomState);

  return { dispatch, ...state };
};

type TimelineConfig = {
  labelsWidth: number;
  rowHeight: number;
  selectionColor: string;
  deselectionColor: string;
};

type TimelineContextValue =
  | {
      isInitialized: false;
    }
  | {
      isInitialized: true;
      config: TimelineConfig;
    };

export const TimelineContext = createContext<TimelineContextValue>({
  isInitialized: false,
});

export const useTimelineConfig = (): TimelineConfig => {
  const context = useContext(TimelineContext);
  if (!context.isInitialized) {
    throw new Error("TimelineContext not defined");
  }
  return context.config;
};

export const defaultTimelineContext: TimelineContextValue = {
  isInitialized: true,
  config: {
    deselectionColor: "red",
    labelsWidth: 150,
    rowHeight: 40,
    selectionColor: "blue",
  },
};
