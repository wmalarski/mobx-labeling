import { Input } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { WorkspaceStore } from "renderer/models";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
};

export const TopBar = observer(({ workspaceStore }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  const handleCurrentFrameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentFrame = Number(event.target.value);
    workspaceStore.setCurrentFrame(currentFrame);
  };

  return (
    <div>
      <Input
        label={t("currentFrameLabel")}
        value={String(workspaceStore.currentFrame)}
        min={0}
        max={workspaceStore.framesCount - 1}
        step={1}
        htmlType="number"
        onChange={handleCurrentFrameChange}
      />
    </div>
  );
});
