import { Button, Checkbox, Grid, Input, Spacer, Text } from "@geist-ui/core";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import {
  ChangeEvent,
  Fragment,
  KeyboardEvent,
  ReactElement,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  MultiSelectDefinition,
  MultiSelectDefinitionOption,
} from "renderer/models";

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

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setNewOption(event.target.value);
    };

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
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
      (event: ChangeEvent<HTMLInputElement>) => {
        option.setSize(event.target.valueAsNumber);
      };

    return (
      <Grid.Container gap={1}>
        <Grid xs={24}>
          <Text h5>{t("multiSelectHeader")}</Text>
        </Grid>
        <Grid xs={24}>
          <Checkbox.Group
            onChange={handleDefaultChange}
            value={fieldDefinition.default}
          >
            <Grid.Container gap={0.5}>
              {fieldDefinition.options.map((option) => (
                <Fragment key={option.text}>
                  <Grid xs={9} sm={12} md={15} justify="space-between">
                    <Checkbox value={option.text}>
                      <Text small>{option.text}</Text>
                    </Checkbox>
                  </Grid>
                  <Grid xs={15} sm={12} md={9}>
                    <Input
                      aria-label={t("multiSelectSize")}
                      htmlType="number"
                      label={t("multiSelectSize")}
                      max={24}
                      min={1}
                      onChange={handleSizeChange(option)}
                      placeholder={t("multiSelectSize")}
                      step={1}
                      value={String(option.size)}
                      width="100%"
                    />
                    <Spacer w={1} />
                    <Button
                      auto
                      color="error"
                      icon={<TrashIcon />}
                      onClick={handleRemoveClick(option)}
                    >
                      {t("multiSelectRemoveOption")}
                    </Button>
                  </Grid>
                </Fragment>
              ))}
            </Grid.Container>
          </Checkbox.Group>
        </Grid>
        <Grid xs={24}>
          <Input
            aria-label={t("multiSelectInput")}
            label={t("multiSelectInput")}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder={t("multiSelectInput")}
            value={newOption}
            width="100%"
          />
          <Spacer w={1} />
          <Button
            auto
            color="secondary"
            disabled={!isValid}
            icon={<PlusIcon />}
            onClick={handleAddClick}
          >
            {t("multiSelectAddOption")}
          </Button>
        </Grid>
      </Grid.Container>
    );
  }
);
