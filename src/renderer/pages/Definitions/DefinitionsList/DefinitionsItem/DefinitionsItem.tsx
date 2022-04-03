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

    const leftSm = 6;
    const leftXs = 12;
    const rightSm = 18;
    const rightXs = 12;

    return (
      <Card width="100%">
        <Grid.Container gap={1} alignItems="center">
          <Grid xs={leftXs} sm={leftSm}>
            <Text small type="secondary">
              {t("namePlaceholder")}
            </Text>
          </Grid>
          <Grid xs={rightXs} sm={rightSm}>
            <Text h4>{definitionEntry.name}</Text>
          </Grid>
          <Grid sm={leftSm} xs={leftXs}>
            <Text small type="secondary">
              {t("descriptionPlaceholder")}
            </Text>
          </Grid>
          <Grid sm={rightSm} xs={rightXs}>
            {definitionEntry.description ? (
              <Text small>{definitionEntry.description}</Text>
            ) : (
              <Text small type="secondary">
                {t("descriptionPlaceholder")}
              </Text>
            )}
          </Grid>
          <Grid sm={leftSm} xs={leftXs}>
            <Text small type="secondary">
              {t("updatedAt")}
            </Text>
          </Grid>
          <Grid sm={rightSm} xs={rightXs}>
            <Text small>{formatTime(definitionEntry.updatedAt, locale)}</Text>
          </Grid>
        </Grid.Container>
        <Spacer h={1} />
        <Grid.Container gap={1}>
          <Grid>
            <Button
              color="primary"
              icon={<CubeIcon />}
              onClick={handleNewProjectClick}
            >
              {t("useDefinition")}
            </Button>
          </Grid>
          <Grid>
            <Button
              color="secondary"
              icon={<Pencil1Icon />}
              onClick={handleEditClick}
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
