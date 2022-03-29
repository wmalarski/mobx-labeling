import * as FlexLayout from "flexlayout-react";
import Konva from "konva";
import { RefObject, useEffect } from "react";

type UseNodeResizeArgs = {
  stageRef: RefObject<Konva.Stage>;
  node: FlexLayout.TabNode;
};

export const useNodeResize = ({ stageRef, node }: UseNodeResizeArgs): void => {
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
