import { RadioGroup } from "@/components/atoms";
import { useForm } from "@/hooks";

import { BaseField, BaseFieldProps } from "./Base";

export function EnumField(props: Omit<BaseFieldProps<string>, "children">) {
  const { name, value, editable = true, enumValues } = props;

  const { update } = useForm();

  return (
    <BaseField {...props}>
      {editable ? (
        <RadioGroup
          name={name}
          value={value}
          radioValues={enumValues}
          onChange={(e) => {
            update({ [name]: e.target.value });
          }}
        />
      ) : (
        props.value
      )}
    </BaseField>
  );
}
