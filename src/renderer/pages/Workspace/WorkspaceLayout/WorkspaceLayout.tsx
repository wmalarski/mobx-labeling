import { Button } from "@geist-ui/core";
import * as FlexLayout from "flexlayout-react";
import { ReactElement, useCallback, useState } from "react";
// import "./dark.css";

export const WorkspaceLayout = (): ReactElement => {
  const [model, setModel] = useState(() => {
    return FlexLayout.Model.fromJson({
      global: {},
      borders: [],
      layout: {
        type: "row",
        weight: 200,
        children: [
          {
            type: "tabset",
            weight: 100,
            children: [
              {
                type: "tab",
                name: "One",
                component: "button",
              },
            ],
          },
          {
            type: "tabset",
            weight: 100,
            children: [
              {
                type: "tab",
                name: "Two",
                component: "button",
              },
            ],
          },
        ],
      },
    });
  });

  const factory = useCallback((node) => {
    const component = node.getComponent();
    if (component === "button") {
      return (
        <div
          style={{ width: "100%", height: "100%", border: "1px solid gray" }}
        >
          <Button>{node.getName()}</Button>
        </div>
      );
    }
    return <p>AA</p>;
  }, []);

  return (
    <div
      style={{
        flexGrow: 1,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        position: "relative",
        border: "1px solid gray",
      }}
    >
      <FlexLayout.Layout
        onModelChange={setModel}
        model={model}
        factory={factory}
        // classNameMapper={(className) => {
        //   console.log("className", { className });
        //   return className;
        // }}
      />
    </div>
  );
};
