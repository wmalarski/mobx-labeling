import { Button, Grid, Input, Radio, Spacer, Text } from "@geist-ui/core";
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
import { SelectDefinition, SelectDefinitionOption } from "renderer/models";

type Props = {
  fieldDefinition: Instance<typeof SelectDefinition>;
};

export const SelectEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const [newOption, setNewOption] = useState("");
    const isValid = !fieldDefinition.options
      .map((option) => option.text)
      .includes(newOption);

    const handleDefaultChange = (value: string | number) => {
      fieldDefinition.setDefault(value as string);
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
      (option: Instance<typeof SelectDefinitionOption>) => () => {
        fieldDefinition.removeOption(option);
      };

    const handleSizeChange =
      (option: Instance<typeof SelectDefinitionOption>) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        option.setSize(event.target.valueAsNumber);
      };

    return (
      <Grid.Container gap={1}>
        <Grid xs={24}>
          <Text h5>{t("selectHeader")}</Text>
        </Grid>
        <Grid xs={24}>
          <Radio.Group
            onChange={handleDefaultChange}
            value={fieldDefinition.default}
          >
            <Grid.Container gap={0.5}>
              {fieldDefinition.options.map((option) => (
                <Fragment key={option.text}>
                  <Grid
                    alignItems="center"
                    justify="space-between"
                    md={15}
                    sm={12}
                    xs={9}
                  >
                    <Radio value={option.text}>
                      <Text>{option.text}</Text>
                    </Radio>
                  </Grid>
                  <Grid xs={15} sm={12} md={9}>
                    <Input
                      aria-label={t("selectSize")}
                      htmlType="number"
                      label={t("selectSize")}
                      max={24}
                      min={1}
                      onChange={handleSizeChange(option)}
                      placeholder={t("selectSize")}
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
                      {t("selectRemoveOption")}
                    </Button>
                  </Grid>
                </Fragment>
              ))}
            </Grid.Container>
          </Radio.Group>
        </Grid>
        <Grid xs={24}>
          <Input
            aria-label={t("selectInput")}
            label={t("selectInput")}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder={t("selectInput")}
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
            {t("selectAddOption")}
          </Button>
        </Grid>
      </Grid.Container>
    );
  }
);
