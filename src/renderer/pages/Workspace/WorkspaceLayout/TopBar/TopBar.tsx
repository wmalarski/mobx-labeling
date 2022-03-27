import { Button, ButtonGroup, Grid, Input } from "@geist-ui/core";
import { CursorArrowIcon, HandIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ToolKind, WorkspaceStore } from "renderer/models";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
};

export const TopBar = observer(({ workspaceStore }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  const handleCurrentFrameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentFrame = Number(event.target.value);
    workspaceStore.currentFrame.setFrame(currentFrame);
  };

  const handleCursorClick = () => {
    workspaceStore.tool.setSelector();
  };

  const handleDragClick = () => {
    workspaceStore.tool.setDrag();
  };

  const toolKind = workspaceStore.tool.kind;

  return (
    <Grid.Container gap={1} margin={0.5}>
      <Grid>
        <ButtonGroup>
          <Button
            auto
            aria-label={t("cursorButton")}
            iconRight={<CursorArrowIcon />}
            onClick={handleCursorClick}
            type={toolKind === ToolKind.Selector ? "success-light" : "default"}
          />
          <Button
            auto
            aria-label={t("dragButton")}
            iconRight={<HandIcon />}
            onClick={handleDragClick}
            type={toolKind === ToolKind.Drag ? "success" : "default"}
          />
        </ButtonGroup>
      </Grid>
      <Grid>
        <Input
          label={t("currentFrameLabel")}
          aria-label={t("currentFrameLabel")}
          value={String(workspaceStore.currentFrame.frame)}
          min={0}
          max={workspaceStore.framesCount - 1}
          step={1}
          htmlType="number"
          onChange={handleCurrentFrameChange}
        />
      </Grid>
    </Grid.Container>
  );
});
