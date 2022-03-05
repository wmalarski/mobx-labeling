import { Button, Card, Grid, Spacer, Text } from "@geist-ui/core";
import { CubeIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useLocale } from "@react-aria/i18n";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-location";
import { DefinitionEntry } from "renderer/models";
import { formatTime } from "renderer/utils/format";
import { routePaths } from "renderer/utils/routes";

type Props = {
  definitionEntry: Instance<typeof DefinitionEntry>;
  onRemoveClick: () => void;
};

export const DefinitionsItem = observer(
  ({ definitionEntry, onRemoveClick }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const locale = useLocale();

    const navigate = useNavigate();

    const handleNewProjectClick = () => {
      navigate({
        to: routePaths.newProject,
        search: { definitionId: definitionEntry.id },
      });
    };

    const handleEditClick = () => {
      navigate({
        to: routePaths.definition(definitionEntry.id),
      });
    };

    return (
      <Card>
        <Grid.Container gap={0.5} alignItems="center">
          <Grid sm={2} xs={4}>
            <Text small type="secondary">
              {t("namePlaceholder")}
            </Text>
          </Grid>
          <Grid sm={10} xs={8}>
            <Text h4>{definitionEntry.name}</Text>
          </Grid>
          <Grid sm={2} xs={4}>
            <Text small type="secondary">
              {t("descriptionPlaceholder")}
            </Text>
          </Grid>
          <Grid sm={10} xs={8}>
            {definitionEntry.description ? (
              <Text small>{definitionEntry.description}</Text>
            ) : (
              <Text small type="secondary">
                {t("descriptionPlaceholder")}
              </Text>
            )}
          </Grid>
          <Grid sm={2} xs={4}>
            <Text small type="secondary">
              {t("updatedAt")}
            </Text>
          </Grid>
          <Grid sm={10} xs={8}>
            <Text small>{formatTime(definitionEntry.updatedAt, locale)}</Text>
          </Grid>
        </Grid.Container>
        <Spacer h={1} />
        <Grid.Container gap={1}>
          <Grid>
            <Button
              color="primary"
              onClick={handleNewProjectClick}
              icon={<CubeIcon />}
            >
              {t("useDefinition")}
            </Button>
          </Grid>
          <Grid>
            <Button
              color="secondary"
              onClick={handleEditClick}
              icon={<Pencil1Icon />}
            >
              {t("editDefinition")}
            </Button>
          </Grid>
          <Grid>
            <Button color="error" onClick={onRemoveClick} icon={<TrashIcon />}>
              {t("removeDefinition")}
            </Button>
          </Grid>
        </Grid.Container>
      </Card>
    );
  }
);
