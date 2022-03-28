import { BaseField, BaseFieldProps } from "./Base";

export function StringField(props: Omit<BaseFieldProps<string>, "children">) {
  const { name, value, editable = true } = props;

  return (
    <BaseField {...props}>
      {editable ? (
        <input name={name} defaultValue={value} />
      ) : (
        props.value ?? "-"
      )}
    </BaseField>
  );
}
