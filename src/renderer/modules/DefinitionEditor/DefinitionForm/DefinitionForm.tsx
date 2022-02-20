import {
  Button,
  Container,
  FormElement,
  Grid,
  Input,
  Loading,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { ExitIcon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-location";
import { DefinitionStore } from "renderer/models";
import { routePaths } from "renderer/utils/routes";

type Props = {
  definitionStore: Instance<typeof DefinitionStore>;
  onSelectedItemChange: (itemId: string) => void;
};

export const DefinitionForm = observer(
  ({ definitionStore, onSelectedItemChange }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const navigate = useNavigate();

    const projectDefinition = definitionStore.projectDefinition;

    const handleNameChange = (event: ChangeEvent<FormElement>) => {
      projectDefinition.setName(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<FormElement>) => {
      projectDefinition.setDescription(event.target.value);
    };

    const handleSaveClick = () => {
      definitionStore.save();
    };

    const handlePlusClick = () => {
      const item = projectDefinition.addNewItem(t("defaultItemName"));
      onSelectedItemChange(item.id);
    };

    const handleBoBackClick = () => {
      navigate({
        to: routePaths.definitions,
      });
    };

    return (
      <Container gap={0} fluid>
        <Row align="center" justify="space-between">
          <div>
            <Text h2>{t("newDefinitionHeader")}</Text>
          </div>
          <div>
            <Grid.Container justify="flex-end" alignItems="center" gap={1}>
              <Grid>
                {definitionStore.state === "done" && (
                  <Text color="$success">{t("definitionSaved")}</Text>
                )}
                {definitionStore.state === "error" && (
                  <Text color="$error">{t("saveFailed")}</Text>
                )}
              </Grid>
              <Grid>
                <Button
                  auto
                  onClick={handlePlusClick}
                  color="primary"
                  icon={<PlusIcon />}
                >
                  {t("addNewItem")}
                </Button>
              </Grid>
              <Grid>
                <Button
                  auto
                  color="primary"
                  onClick={handleSaveClick}
                  icon={<Pencil1Icon />}
                >
                  {definitionStore.state === "pending" ? (
                    <Loading color="white" size="sm" />
                  ) : (
                    t("saveDefinition")
                  )}
                </Button>
              </Grid>
              <Grid>
                <Button
                  auto
                  color="secondary"
                  onClick={handleBoBackClick}
                  icon={<ExitIcon />}
                >
                  {t("definitionsList")}
                </Button>
              </Grid>
            </Grid.Container>
          </div>
        </Row>
        <Spacer y={1} />
        <Row>
          <Input
            fullWidth
            value={projectDefinition.name}
            onChange={handleNameChange}
            placeholder={t("namePlaceholder")}
            labelLeft={t("namePlaceholder")}
            aria-label={t("namePlaceholder")}
          />
        </Row>
        <Spacer y={0.5} />
        <Row>
          <Input
            fullWidth
            value={projectDefinition.description}
            onChange={handleDescriptionChange}
            placeholder={t("descriptionPlaceholder")}
            labelLeft={t("descriptionPlaceholder")}
            aria-label={t("descriptionPlaceholder")}
          />
        </Row>
      </Container>
    );
  }
);
