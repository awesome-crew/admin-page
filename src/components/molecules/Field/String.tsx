import { useForm } from "@/hooks";

import { BaseField, BaseFieldProps } from "./Base";

export function StringField(props: Omit<BaseFieldProps<string>, "children">) {
  const { name, value, editable = true } = props;

  const { update } = useForm();

  return (
    <BaseField {...props}>
      {editable ? (
        <input
          name={name}
          defaultValue={value}
          onChange={(e) => {
            update({ [name]: e.target.value });
          }}
        />
      ) : (
        props.value ?? "-"
      )}
    </BaseField>
  );
}
