import { Button, Grid, Input, Radio, Spacer, Text } from "@geist-ui/core";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, KeyboardEvent, ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { ComboBoxDefinition } from "renderer/models";

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

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setNewOption(event.target.value);
    };

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
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
      <Grid.Container gap={1}>
        <Grid xs={24}>
          <Text h5>{t("comboBoxHeader")}</Text>
        </Grid>
        <Grid xs={24}>
          <Radio.Group
            value={fieldDefinition.default}
            onChange={handleDefaultChange}
          >
            <Grid.Container gap={0.5}>
              {fieldDefinition.options.map((option) => (
                <Grid xs={24} key={option} justify="space-between">
                  <Radio value={option}>
                    <Text small>{option}</Text>
                  </Radio>
                  <Button
                    auto
                    color="error"
                    onClick={handleRemoveClick(option)}
                    icon={<TrashIcon />}
                  >
                    {t("comboBoxRemoveOption")}
                  </Button>
                </Grid>
              ))}
            </Grid.Container>
          </Radio.Group>
        </Grid>
        <Grid xs={24}>
          <Input
            width="100%"
            value={newOption}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder={t("comboBoxOptionPlaceholder")}
            label={t("comboBoxOptionPlaceholder")}
            aria-label={t("comboBoxOptionPlaceholder")}
          />
          <Spacer w={1} />
          <Button
            auto
            onClick={handleAddClick}
            color="secondary"
            disabled={!isValid}
            icon={<PlusIcon />}
          >
            {t("comboBoAddOption")}
          </Button>
        </Grid>
      </Grid.Container>
    );
  }
);
