import { Checkbox, CheckboxEvent, Col, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { CheckBoxDefinition } from "renderer/models/fields/checkBox";

type Props = {
  fieldDefinition: Instance<typeof CheckBoxDefinition>;
};

export const CheckBoxEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handleChange = (event: CheckboxEvent) => {
      fieldDefinition.setDefault(event.target.checked);
    };

    return (
      <Col>
        <Text h4>{t("checkboxHeader")}</Text>
        <Checkbox checked={fieldDefinition.default} onChange={handleChange}>
          {fieldDefinition.default
            ? t("checkboxDefaultTrue")
            : t("checkboxDefaultFalse")}
        </Checkbox>
      </Col>
    );
  }
);
