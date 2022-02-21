import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { NewProjectStore } from "renderer/models";
import { useOpenDialog } from "renderer/services";

type Props = {
  newProjectStore: Instance<typeof NewProjectStore>;
};

export const ResourcesList = observer(
  ({ newProjectStore }: Props): ReactElement => {
    const { t } = useTranslation("project");

    const { open: openSelectDialog } = useOpenDialog({
      onReturn: (result) => {
        console.log({ result });
      },
    });

    const handleOpenClick = () => {
      openSelectDialog({
        title: t("selectResourceDialog"),
      });
    };

    return (
      <div>
        <p>ResourcesList</p>
      </div>
    );
  }
);
