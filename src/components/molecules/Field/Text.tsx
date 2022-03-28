import { BaseField, BaseFieldProps } from "./Base";

export function TextField(props: Omit<BaseFieldProps<string>, "children">) {
  const { name, value, editable = true } = props;

  return (
    <BaseField {...props}>
      {editable ? <textarea name={name} defaultValue={value} /> : props.value}
    </BaseField>
  );
}
