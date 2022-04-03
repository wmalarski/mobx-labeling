import { Card, Divider, Text, useTheme } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { MouseEvent as ReactMouseEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { FieldDefinition } from "renderer/models";

type Props = {
  fieldDefinition: Instance<typeof FieldDefinition>;
  onClick: () => void;
};

export const FieldListItem = observer(
  ({ fieldDefinition, onClick }: Props): ReactElement => {
    const { t } = useTranslation("definition");
    const theme = useTheme();

    const handleClick = (
      event: ReactMouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      event.stopPropagation();
      onClick();
    };

    return (
      <Card
        hoverable
        onClick={handleClick}
        data-testid="field-item"
        style={{
          backgroundColor: theme.palette.background,
          margin: theme.layout.gapQuarter,
          position: "relative",
        }}
      >
        <Card.Content>
          <Text>{fieldDefinition.name}</Text>
        </Card.Content>
        <Divider h="1px" my={0} />
        <Card.Content>
          <Text i small>
            {fieldDefinition.kind}
          </Text>
          <br />
          {fieldDefinition.description ? (
            <Text small>{fieldDefinition.description}</Text>
          ) : (
            <Text small type="secondary">
              {t("descriptionPlaceholder")}
            </Text>
          )}
        </Card.Content>
      </Card>
    );
  }
);
