import { Grid, Input, Pagination, Text } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ProjectsList } from "renderer/models";
import { RecentItem } from "./RecentItem/RecentItem";

type Props = {
  projectsList: Instance<typeof ProjectsList>;
};

export const Recent = observer(({ projectsList }: Props): ReactElement => {
  const { t } = useTranslation("home");

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    projectsList.load({ page: 0, query: event.target.value });
  };

  const handlePageChange = (page: number) => {
    projectsList.load({ page: page - 1 });
  };

  return (
    <Grid.Container gap={1}>
      <Grid xs={24}>
        <Input
          aria-label={t("searchPlaceholder")}
          clearable
          label={t("searchPlaceholder")}
          onChange={handleQueryChange}
          placeholder={t("searchPlaceholder")}
          value={projectsList.query}
          width="100%"
        />
      </Grid>
      {projectsList.projects.map((projectEntry) => (
        <Grid xs={24} key={projectEntry.id}>
          <RecentItem projectEntry={projectEntry} />
        </Grid>
      ))}
      {projectsList.error && (
        <Grid xs={24}>
          <Text h4 type="error">
            {t("loadingError")}
          </Text>
        </Grid>
      )}
      <Grid xs={24} justify="center">
        <Pagination
          count={projectsList.totalPages}
          onChange={handlePageChange}
          page={projectsList.page + 1}
        />
      </Grid>
    </Grid.Container>
  );
});
