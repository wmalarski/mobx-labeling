import { Input } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { TextField } from "renderer/models";

type Props = {
  textField: Instance<typeof TextField>;
};

export const TextForm = observer(({ textField }: Props): ReactElement => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    textField.current?.setValue(event.target.value);
  };

  return (
    <Input
      value={textField.current?.value}
      onChange={handleChange}
      aria-label={textField.definition.name}
      placeholder={textField.definition.name}
      width="100%"
      clearable
    />
  );
});
