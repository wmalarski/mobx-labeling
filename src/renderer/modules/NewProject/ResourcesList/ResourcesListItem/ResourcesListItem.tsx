import { Card, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Resource } from "renderer/models/project/Resource";

type Props = {
  resource: Instance<typeof Resource>;
};

export const ResourcesListItem = observer(
  ({ resource }: Props): ReactElement => {
    const { t } = useTranslation("project");

    return (
      <Card>
        <Text>{resource.path}</Text>
        <Text>{resource.fps}</Text>
      </Card>
    );
  }
);
