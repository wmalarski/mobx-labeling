import { Button, Input, Modal, useModal } from "@geist-ui/core";
import { Link1Icon } from "@radix-ui/react-icons";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { NewProjectStore } from "renderer/models";

type Props = {
  newProjectStore: Instance<typeof NewProjectStore>;
};

export const UrlResourceModal = ({ newProjectStore }: Props): ReactElement => {
  const { t } = useTranslation("project");

  const { setVisible, bindings } = useModal();

  const [path, setPath] = useState("");

  const handleOpenClick = () => {
    setPath("");
    setVisible(true);
  };

  const handleAddClick = () => {
    newProjectStore.addResource(path);
    setVisible(false);
  };

  const handlePathChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPath(event.target.value);
  };

  return (
    <>
      <Button icon={<Link1Icon />} auto onClick={handleOpenClick}>
        {t("resourceURL")}
      </Button>
      <Modal {...bindings}>
        <Modal.Title>{t("addURLTitle")}</Modal.Title>
        <Modal.Subtitle>{t("addURLSubtitle")}</Modal.Subtitle>
        <Modal.Content>
          <Input
            width="100%"
            label={t("pathLabel")}
            placeholder={t("pathLabel")}
            aria-label={t("pathLabel")}
            value={path}
            onChange={handlePathChange}
          />
        </Modal.Content>
        <Modal.Action passive onClick={bindings.onClose}>
          {t("addURLCancel")}
        </Modal.Action>
        <Modal.Action disabled={path.length < 1} onClick={handleAddClick}>
          {t("addURLSave")}
        </Modal.Action>
      </Modal>
    </>
  );
};
