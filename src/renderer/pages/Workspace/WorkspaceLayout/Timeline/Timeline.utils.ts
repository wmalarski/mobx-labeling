import { Instance } from "mobx-state-tree";
import { useReducer } from "react";
import { Item, WorkspaceStore } from "renderer/models";
import { optionalClamp } from "renderer/utils/geometry";

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
    }
  | {
      type: "move";
      x: number;
    };

export type UseXZoomResult = UseXZoomState & {
  dispatch: (action: UseXZoomAction) => void;
};

export const getNewXZoomState = (
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
    case "move": {
      return { ...state, stageX: action.x };
    }
  }
};

export const useXZoom = (): UseXZoomResult => {
  const [state, dispatch] = useReducer(reducer, defaultXZoomState);

  return { dispatch, ...state };
};

export type ItemPosition = {
  item: Instance<typeof Item>;
  size: number;
  position: number;
};

export const getItemPositions = (
  workspaceStore: Instance<typeof WorkspaceStore>
): ItemPosition[] => {
  return workspaceStore.batch.items.reduce<ItemPosition[]>((prev, item) => {
    const last = prev.at(-1);

    const lastPosition = last?.position ?? 0;
    const lastSize = last?.size ?? 0;

    const position = lastPosition + lastSize;
    const size = 1 + (item.toggled ? item.fields.length : 0);

    return [...prev, { item, position, size }];
  }, []);
};

export const getRowCount = (positions: ItemPosition[]): number => {
  const last = positions.at(-1);
  if (!last) return 0;
  return last.position + last.size;
};
