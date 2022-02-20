import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
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
};

export const DefinitionsItem = observer(
  ({ definitionEntry }: Props): ReactElement => {
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

    const handleRemoveClick = () => {
      //
    };

    return (
      <Card>
        <Container gap={0}>
          <Row align="center">
            <Col span={2}>
              <Text small color="$accents6">
                {t("namePlaceholder")}
              </Text>
            </Col>
            <Col>
              <Text h3>{definitionEntry.name}</Text>
            </Col>
          </Row>
          <Spacer y={0.5} />
          <Row>
            <Col span={2}>
              <Text small color="$accents6">
                {t("descriptionPlaceholder")}
              </Text>
            </Col>
            <Col>
              {definitionEntry.description ? (
                <Text small>{definitionEntry.description}</Text>
              ) : (
                <Text small color="$accents6">
                  {t("descriptionPlaceholder")}
                </Text>
              )}
            </Col>
          </Row>
          <Spacer y={0.5} />
          <Row>
            <Col span={2}>
              <Text small color="$accents6">
                {t("updatedAt")}
              </Text>
            </Col>
            <Col>
              <Text small>{formatTime(definitionEntry.updatedAt, locale)}</Text>
            </Col>
          </Row>
          <Spacer y={1} />
          <Row>
            <Button
              color="primary"
              onClick={handleNewProjectClick}
              icon={<CubeIcon />}
            >
              {t("useDefinition")}
            </Button>
            <Spacer x={0.5} />
            <Button
              color="secondary"
              onClick={handleEditClick}
              icon={<Pencil1Icon />}
            >
              {t("editDefinition")}
            </Button>
            <Spacer x={0.5} />
            <Button
              color="error"
              onClick={handleRemoveClick}
              icon={<TrashIcon />}
            >
              {t("removeDefinition")}
            </Button>
          </Row>
        </Container>
      </Card>
    );
  }
);
