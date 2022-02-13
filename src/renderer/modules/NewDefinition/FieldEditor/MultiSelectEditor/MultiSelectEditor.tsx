import {
  Button,
  Checkbox,
  Container,
  FormElement,
  Input,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, KeyboardEvent, ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MultiSelectDefinition,
  MultiSelectDefinitionOption,
} from "renderer/models/fields/multiSelect";

type Props = {
  fieldDefinition: Instance<typeof MultiSelectDefinition>;
};

export const MultiSelectEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const [newOption, setNewOption] = useState("");
    const isValid = !fieldDefinition.options
      .map((option) => option.text)
      .includes(newOption);

    const handleDefaultChange = (values: string[]) => {
      fieldDefinition.setDefault(values);
    };

    const handleInputChange = (event: ChangeEvent<FormElement>) => {
      setNewOption(event.target.value);
    };

    const handleInputKeyDown = (event: KeyboardEvent<FormElement>) => {
      if (event.key !== "Enter" || !isValid) return;

      fieldDefinition.pushOption({ text: newOption, size: 2 });
      setNewOption("");
    };

    const handleAddClick = () => {
      fieldDefinition.pushOption({ text: newOption, size: 2 });
      setNewOption("");
    };

    const handleRemoveClick =
      (option: Instance<typeof MultiSelectDefinitionOption>) => () => {
        fieldDefinition.removeOption(option);
      };

    const handleSizeChange =
      (option: Instance<typeof MultiSelectDefinitionOption>) =>
      (event: ChangeEvent<FormElement>) => {
        option.setSize(Number(event.target.value));
      };

    return (
      <Container>
        <Row>
          <Text h4>{t("multiSelectHeader")}</Text>
        </Row>
        <Spacer y={1} />
        <Row>
          <Checkbox.Group
            value={fieldDefinition.default}
            onChange={handleDefaultChange}
            css={{ width: "100%" }}
          >
            <Container gap={0}>
              {fieldDefinition.options.map((option) => (
                <Row key={option.text} justify="space-between">
                  <Checkbox value={option.text}>
                    <Text>{option.text}</Text>
                    <Spacer x={1} />
                    <Input
                      type="number"
                      min={1}
                      max={12}
                      step={1}
                      aria-label={t("multiSelectSize")}
                      labelLeft={t("multiSelectSize")}
                      value={String(option.size)}
                      onChange={handleSizeChange(option)}
                    />
                  </Checkbox>
                  <Button
                    auto
                    color="secondary"
                    onClick={handleRemoveClick(option)}
                  >
                    {t("multiSelectRemoveOption")}
                  </Button>
                </Row>
              ))}
            </Container>
          </Checkbox.Group>
        </Row>
        <Spacer y={1.5} />
        <Row>
          <Input
            fullWidth
            value={newOption}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            aria-label={t("multiSelectInput")}
            labelPlaceholder={t("multiSelectInput")}
          />
          <Spacer x={1} />
          <Button auto onClick={handleAddClick} disabled={!isValid}>
            {t("multiSelectAddOption")}
          </Button>
        </Row>
      </Container>
    );
  }
);
