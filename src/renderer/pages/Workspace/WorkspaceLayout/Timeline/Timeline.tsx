import * as FlexLayout from "flexlayout-react";
import { observer } from "mobx-react-lite";
import { getSnapshot, Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { WorkspaceStore } from "renderer/models";
import { useXZoom } from "./Timeline.utils";
import { TimelineBar } from "./TimelineBar/TimelineBar";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  node: FlexLayout.TabNode;
};

export const Timeline = observer(({ workspaceStore }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  const zoom = useXZoom();

  return (
    <div>
      <p>{t("Timeline")}</p>
      <TimelineBar zoom={zoom} />
      <pre>
        {JSON.stringify(
          getSnapshot(workspaceStore.project.definition),
          null,
          2
        )}
      </pre>
    </div>
  );
});
