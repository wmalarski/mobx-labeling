import {
  Button,
  Container,
  FormElement,
  Input,
  Loading,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { StyledLink } from "renderer/components";
import { DefinitionStore } from "renderer/models";
import { routePaths } from "renderer/utils/routes";

type Props = {
  definitionStore: Instance<typeof DefinitionStore>;
};

export const DefinitionForm = observer(
  ({ definitionStore }: Props): ReactElement => {
    const { t } = useTranslation("definition");

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

    return (
      <Container gap={0} fluid>
        <Row align="center" justify="space-between">
          <Text h2>{t("newDefinitionHeader")}</Text>
          <StyledLink to={routePaths.definitions}>
            {t("definitionsList")}
          </StyledLink>
          {definitionStore.state === "done" && (
            <Text color="$success">{t("definitionSaved")}</Text>
          )}
          {definitionStore.state === "error" && (
            <Text color="$error">{t("saveFailed")}</Text>
          )}
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
        </Row>
        <Spacer y={0.5} />
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
