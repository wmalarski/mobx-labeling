import { Card, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { MouseEvent as ReactMouseEvent, ReactElement } from "react";
import { DraggableStateSnapshot } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { FieldDefinition } from "renderer/models/definition";
import * as Styles from "./FieldListItem.styles";

type Props = {
  stateSnapshot: DraggableStateSnapshot;
  fieldDefinition: Instance<typeof FieldDefinition>;
  onClick: () => void;
};

export const FieldListItem = observer(
  ({ fieldDefinition, onClick }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handleClick = (
      event: ReactMouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      event.stopPropagation();
      onClick();
    };

    return (
      <Styles.Container>
        <Card
          hoverable
          clickable
          css={{ backgroundColor: "black" }}
          onClick={handleClick}
        >
          <Card.Body>
            <Text>{fieldDefinition.name}</Text>
            <Text i small>
              {fieldDefinition.kind}
            </Text>
            {fieldDefinition.description ? (
              <Text small>{fieldDefinition.description}</Text>
            ) : (
              <Text small color="$accents6">
                {t("descriptionPlaceholder")}
              </Text>
            )}
          </Card.Body>
        </Card>
      </Styles.Container>
    );
  }
);
