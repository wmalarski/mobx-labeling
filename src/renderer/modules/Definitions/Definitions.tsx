import {
  Button,
  Col,
  FormElement,
  Input,
  Pagination,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { PlusIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { ChangeEvent, Fragment, ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-location";
import { IntroLayout } from "renderer/components";
import { DefinitionsList } from "renderer/models";
import { routePaths } from "renderer/utils/routes";
import { DefinitionsItem } from "./DefinitionsItem/DefinitionsItem";

export const Definitions = observer((): ReactElement => {
  const { t } = useTranslation("definition");

  const navigate = useNavigate();

  const [definitionsList] = useState(() => {
    return DefinitionsList.create({});
  });

  const handlePageChange = (page: number) => {
    definitionsList.load({ page: page - 1 });
  };

  const handleQueryChange = (event: ChangeEvent<FormElement>) => {
    definitionsList.load({ page: 0, query: event.target.value });
  };

  const handleNewDefinitionClick = () => {
    navigate({
      to: routePaths.newDefinition,
    });
  };

  return (
    <IntroLayout>
      <Row>
        <Link to={routePaths.home}>Home</Link>
      </Row>
      <Spacer y={1} />
      <Row align="center">
        <Col>
          <Text h1>{t("definitionsHeader")}</Text>
        </Col>
        <Col span={2}>
          <Button
            color="primary"
            onClick={handleNewDefinitionClick}
            icon={<PlusIcon />}
          >
            {t("newDefinitionHeader")}
          </Button>
        </Col>
      </Row>
      <Spacer y={1} />
      <Row>
        <Input
          fullWidth
          type="search"
          clearable
          value={definitionsList.query}
          onChange={handleQueryChange}
          labelLeft={t("searchPlaceholder")}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchPlaceholder")}
        />
      </Row>
      <Spacer y={1} />
      {definitionsList.definitions.map((definitionEntry) => (
        <Fragment key={definitionEntry.id}>
          <Row>
            <DefinitionsItem definitionEntry={definitionEntry} />
          </Row>
          <Spacer y={0.5} />
        </Fragment>
      ))}
      <Spacer y={0.5} />
      <Row justify="center">
        <Pagination
          total={definitionsList.totalPages}
          page={definitionsList.page}
          onChange={handlePageChange}
        />
      </Row>
      <Spacer y={1} />
    </IntroLayout>
  );
});
