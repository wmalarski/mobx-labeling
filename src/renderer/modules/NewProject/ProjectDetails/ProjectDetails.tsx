import {
  Button,
  Container,
  FormElement,
  Input,
  Spacer,
} from "@nextui-org/react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Item } from "@react-stately/collections";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ComboBox } from "renderer/components";
import { NewProjectStore } from "renderer/models";
import { useSaveDialog } from "renderer/services/resources/useSaveDialog";

type Props = {
  newProjectStore: Instance<typeof NewProjectStore>;
};

export const ProjectDetails = observer(
  ({ newProjectStore }: Props): ReactElement => {
    const { t } = useTranslation("project");

    const { open: openSaveDialog } = useSaveDialog({
      onReturn: (result) => {
        if (!result.filePath) return;
        newProjectStore.setProjectPath(result.filePath);
      },
    });

    const handleInputChange = (query: string) => {
      newProjectStore.definitions.load({ query });
    };

    const handlePathChange = (event: ChangeEvent<FormElement>) => {
      newProjectStore.setProjectPath(event.target.value);
    };

    const handleSelectionChange = (key: string | number) => {
      newProjectStore.setDefinitionId(key as string);
    };

    const handleSaveClick = () => {
      openSaveDialog({
        title: t("projectLocationDialog"),
        filters: [{ extensions: ["labels"], name: t("filetypeName") }],
      });
    };

    const handleNameChange = (event: ChangeEvent<FormElement>) => {
      newProjectStore.setName(event.target.value);
    };

    return (
      <Container gap={0} fluid>
        <Input
          fullWidth
          labelLeft={t("namePlaceholder")}
          placeholder={t("namePlaceholder")}
          aria-label={t("namePlaceholder")}
          value={newProjectStore.name}
          onChange={handleNameChange}
        />
        <Spacer y={0.5} />
        <ComboBox
          label={t("selectDefinitionLabel")}
          inputValue={newProjectStore.definitions.query}
          onInputChange={handleInputChange}
          onSelectionChange={handleSelectionChange}
        >
          {newProjectStore.definitions.definitions.map((definition) => (
            <Item key={definition.id}>{definition.name}</Item>
          ))}
        </ComboBox>
        <Spacer y={0.5} />
        <Input
          fullWidth
          labelLeft={t("locationLabel")}
          placeholder={t("locationLabel")}
          aria-label={t("locationLabel")}
          onChange={handlePathChange}
          value={newProjectStore.projectPath}
          contentRight={
            <Button
              auto
              rounded
              onClick={handleSaveClick}
              size="sm"
              css={{ padding: "$4" }}
            >
              <Pencil1Icon />
            </Button>
          }
        />
      </Container>
    );
  }
);
