import {
  Button,
  Container,
  FormElement,
  Input,
  Radio,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, KeyboardEvent, ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { ComboBoxDefinition } from "renderer/models/fields/comboBox";

type Props = {
  fieldDefinition: Instance<typeof ComboBoxDefinition>;
};

export const ComboBoxEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const [newOption, setNewOption] = useState("");
    const isValid = !fieldDefinition.options.includes(newOption);

    const handleDefaultChange = (value: string | number) => {
      fieldDefinition.setDefault(value as string);
    };

    const handleInputChange = (event: ChangeEvent<FormElement>) => {
      setNewOption(event.target.value);
    };

    const handleInputKeyDown = (event: KeyboardEvent<FormElement>) => {
      if (event.key !== "Enter" || !isValid) return;

      fieldDefinition.pushOption(newOption);
      setNewOption("");
    };

    const handleAddClick = () => {
      fieldDefinition.pushOption(newOption);
      setNewOption("");
    };

    const handleRemoveClick = (option: string) => () => {
      fieldDefinition.removeOption(option);
    };

    return (
      <Container gap={0}>
        <Row>
          <Text h4>{t("comboBoxHeader")}</Text>
        </Row>
        <Spacer y={1} />
        <Row>
          <Radio.Group
            value={fieldDefinition.default}
            onChange={handleDefaultChange}
            css={{ width: "100%" }}
          >
            <Container gap={0}>
              {fieldDefinition.options.map((option) => (
                <Row key={option} justify="space-between">
                  <Radio value={option}>
                    <Text>{option}</Text>
                  </Radio>
                  <Button
                    auto
                    color="secondary"
                    onClick={handleRemoveClick(option)}
                  >
                    {t("comboBoxRemoveOption")}
                  </Button>
                </Row>
              ))}
            </Container>
          </Radio.Group>
        </Row>
        <Spacer y={1.5} />
        <Row>
          <Input
            fullWidth
            value={newOption}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder={t("comboBoxOptionPlaceholder")}
            labelLeft={t("comboBoxOptionPlaceholder")}
            aria-label={t("comboBoxOptionPlaceholder")}
          />
          <Spacer x={1} />
          <Button auto onClick={handleAddClick} disabled={!isValid}>
            {t("comboBoAddOption")}
          </Button>
        </Row>
      </Container>
    );
  }
);
