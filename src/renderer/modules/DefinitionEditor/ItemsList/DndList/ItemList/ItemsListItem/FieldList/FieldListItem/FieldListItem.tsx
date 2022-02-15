import { Card, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { DraggableStateSnapshot } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { FieldDefinition } from "renderer/models/definition";
import * as Styles from "./FieldListItem.styles";

type Props = {
  stateSnapshot: DraggableStateSnapshot;
  fieldDefinition: Instance<typeof FieldDefinition>;
};

export const FieldListItem = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    return (
      <Styles.Container>
        <Card hoverable css={{ backgroundColor: "black" }}>
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
