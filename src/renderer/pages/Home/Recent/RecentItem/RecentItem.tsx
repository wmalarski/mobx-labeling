import { Button, Card, Grid, Text } from "@geist-ui/core";
import { CubeIcon } from "@radix-ui/react-icons";
import { useLocale } from "@react-aria/i18n";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-location";
import { ProjectEntry } from "renderer/models";
import { formatTime } from "renderer/utils/format";
import { routePaths } from "renderer/utils/routes";

type Props = {
  projectEntry: Instance<typeof ProjectEntry>;
};

export const RecentItem = observer(({ projectEntry }: Props): ReactElement => {
  const { t } = useTranslation("home");
  const locale = useLocale();

  const navigate = useNavigate();

  const leftXs = 12;
  const rightXs = 12;
  const leftSm = 6;
  const rightSm = 18;

  const handleEditClick = () => {
    navigate({
      to: routePaths.workspace,
      search: { project: projectEntry.projectPath },
    });
  };

  return (
    <Card width="100%">
      <Grid.Container gap={1} alignItems="center">
        <Grid xs={leftXs} sm={leftSm}>
          <Text small type="secondary">
            {t("nameLabel")}
          </Text>
        </Grid>
        <Grid xs={rightXs} sm={rightSm}>
          <Text my={0} b>
            {projectEntry.name}
          </Text>
        </Grid>
        <Grid xs={leftXs} sm={leftSm}>
          <Text small type="secondary">
            {t("pathLabel")}
          </Text>
        </Grid>
        <Grid xs={rightXs} sm={rightSm}>
          <Text small>{projectEntry.projectPath}</Text>
        </Grid>
        <Grid xs={leftXs} sm={leftSm}>
          <Text small type="secondary">
            {t("definitionLabel")}
          </Text>
        </Grid>
        <Grid xs={rightXs} sm={rightSm}>
          <Text small>{projectEntry.definition}</Text>
        </Grid>
        <Grid xs={leftXs} sm={leftSm}>
          <Text small type="secondary">
            {t("updatedAtLabel")}
          </Text>
        </Grid>
        <Grid xs={rightXs} sm={rightSm}>
          <Text small>{formatTime(projectEntry.updatedAt, locale)}</Text>
        </Grid>
        <Grid xs={24}>
          <Button
            color="secondary"
            onClick={handleEditClick}
            icon={<CubeIcon />}
          >
            {t("openProject")}
          </Button>
        </Grid>
      </Grid.Container>
    </Card>
  );
});
