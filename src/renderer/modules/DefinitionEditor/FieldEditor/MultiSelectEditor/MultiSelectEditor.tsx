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
            value={fieldDefinition.default}
            onChange={handleDefaultChange}
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
                      width="100%"
                      min={1}
                      htmlType="number"
                      max={24}
                      step={1}
                      placeholder={t("multiSelectSize")}
                      aria-label={t("multiSelectSize")}
                      label={t("multiSelectSize")}
                      value={String(option.size)}
                      onChange={handleSizeChange(option)}
                    />
                    <Spacer w={1} />
                    <Button
                      auto
                      color="error"
                      onClick={handleRemoveClick(option)}
                      icon={<TrashIcon />}
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
            width="100%"
            value={newOption}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder={t("multiSelectInput")}
            label={t("multiSelectInput")}
            aria-label={t("multiSelectInput")}
          />
          <Spacer w={1} />
          <Button
            auto
            color="secondary"
            onClick={handleAddClick}
            disabled={!isValid}
            icon={<PlusIcon />}
          >
            {t("multiSelectAddOption")}
          </Button>
        </Grid>
      </Grid.Container>
    );
  }
);
