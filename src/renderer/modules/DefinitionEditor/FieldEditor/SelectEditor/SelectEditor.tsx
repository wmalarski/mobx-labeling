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
        option.setSize(Number(event.target.value));
      };

    return (
      <Grid.Container gap={1}>
        <Grid xs={24}>
          <Text h5>{t("selectHeader")}</Text>
        </Grid>
        <Grid xs={24}>
          <Radio.Group
            value={fieldDefinition.default}
            onChange={handleDefaultChange}
          >
            <Grid.Container gap={0.5}>
              {fieldDefinition.options.map((option) => (
                <Fragment key={option.text}>
                  <Grid
                    xs={9}
                    sm={12}
                    md={15}
                    justify="space-between"
                    alignItems="center"
                  >
                    <Radio value={option.text}>
                      <Text>{option.text}</Text>
                    </Radio>
                  </Grid>
                  <Grid xs={15} sm={12} md={9}>
                    <Input
                      htmlType="number"
                      width="100%"
                      min={1}
                      max={24}
                      step={1}
                      placeholder={t("selectSize")}
                      aria-label={t("selectSize")}
                      label={t("selectSize")}
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
            width="100%"
            value={newOption}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder={t("selectInput")}
            label={t("selectInput")}
            aria-label={t("selectInput")}
          />
          <Spacer w={1} />
          <Button
            auto
            color="secondary"
            onClick={handleAddClick}
            disabled={!isValid}
            icon={<PlusIcon />}
          >
            {t("selectAddOption")}
          </Button>
        </Grid>
      </Grid.Container>
    );
  }
);
