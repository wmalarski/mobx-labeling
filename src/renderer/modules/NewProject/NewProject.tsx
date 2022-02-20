import { Button, Spacer } from "@nextui-org/react";
import { Item } from "@react-stately/collections";
import { observer } from "mobx-react-lite";
import { getSnapshot } from "mobx-state-tree";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMatch } from "react-location";
import { ComboBox, IntroLayout, StyledLink } from "renderer/components";
import { DefinitionsList, NewProjectStore } from "renderer/models";
import { useOpenDialog } from "renderer/services";
import { LocationGenerics, routePaths } from "renderer/utils/routes";
import { Header } from "../Header/Header";

export const NewProject = observer((): ReactElement => {
  const { t } = useTranslation("definition");

  const { data } = useMatch<LocationGenerics>();

  const { open } = useOpenDialog({
    onReturn: (result) => {
      console.log({ result });
    },
  });

  const [newProjectStore] = useState(() => {
    return NewProjectStore.create({
      name: "",
      definitionId: data.projectDefinition?.id,
      resources: [],
      definitions: DefinitionsList.create({
        query: data.projectDefinition?.name,
      }),
    });
  });

  const handleInputChange = (input: string) => {
    newProjectStore.definitions.load({ query: input });
  };

  const handleSelectionChange = (key: string | number) => {
    newProjectStore.setDefinitionId(key as string);
  };

  const handleOpenClick = () => {
    open({});
  };

  return (
    <IntroLayout>
      <Header />
      <Spacer y={1} />
      <StyledLink to={routePaths.definitions}>
        {t("definitionsHeader")}
      </StyledLink>
      <StyledLink to={routePaths.workspace} search={{ project: "project123" }}>
        Workspace
      </StyledLink>
      <ComboBox
        label="Definition"
        inputValue={newProjectStore.definitions.query}
        onInputChange={handleInputChange}
        onSelectionChange={handleSelectionChange}
      >
        {newProjectStore.definitions.definitions.map((definition) => (
          <Item key={definition.id}>{definition.name}</Item>
        ))}
      </ComboBox>
      <Button onClick={handleOpenClick}>Open</Button>
      <pre>{JSON.stringify(getSnapshot(newProjectStore), null, 2)}</pre>
    </IntroLayout>
  );
});
