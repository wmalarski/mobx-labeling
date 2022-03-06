import { Button, Input, Modal } from "@geist-ui/core";
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

  const [isVisible, setIsVisible] = useState(false);
  const [path, setPath] = useState("");

  const handleOpenClick = () => {
    setPath("");
    setIsVisible(true);
  };

  const handleCloseClick = () => {
    setIsVisible(false);
  };

  const handleAddClick = () => {
    newProjectStore.addResource(path);
    setIsVisible(false);
  };

  const handlePathChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPath(event.target.value);
  };

  return (
    <>
      <Button icon={<Link1Icon />} auto onClick={handleOpenClick}>
        {t("resourceURL")}
      </Button>
      <Modal visible={isVisible} onClose={handleCloseClick}>
        <Modal.Title>{t("addURLTitle")}</Modal.Title>
        <Modal.Subtitle>{t("addURLSubtitle")}</Modal.Subtitle>
        <Modal.Content>
          <Input
            width="100%"
            label={t("pathLabel")}
            placeholder={t("pathLabel")}
            value={path}
            onChange={handlePathChange}
          />
        </Modal.Content>
        <Modal.Action passive onClick={handleCloseClick}>
          {t("addURLCancel")}
        </Modal.Action>
        <Modal.Action disabled={path.length < 1} onClick={handleAddClick}>
          {t("addURLSave")}
        </Modal.Action>
      </Modal>
    </>
  );
};
