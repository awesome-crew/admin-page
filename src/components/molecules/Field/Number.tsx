import { useForm } from "@/hooks";

import { BaseField, BaseFieldProps } from "./Base";

export function NumberField(props: Omit<BaseFieldProps<number>, "children">) {
  const { name, value, editable = true } = props;

  const { update } = useForm();

  return (
    <BaseField {...props}>
      {editable ? (
        <input
          type="number"
          name={name}
          defaultValue={value}
          onChange={(e) => {
            update({ [name]: Number(e.target.value) });
          }}
        />
      ) : (
        props.value
      )}
    </BaseField>
  );
}
