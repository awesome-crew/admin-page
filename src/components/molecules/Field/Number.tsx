import { BaseField, BaseFieldProps } from "./Base";

export function NumberField(props: Omit<BaseFieldProps<number>, "children">) {
  const { name, value, editable = true } = props;

  return (
    <BaseField {...props}>
      {editable ? (
        <input type="number" name={name} defaultValue={value} />
      ) : (
        props.value
      )}
    </BaseField>
  );
}
