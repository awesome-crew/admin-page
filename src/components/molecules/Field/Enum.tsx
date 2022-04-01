import { Radio } from "@/components/atoms";
import { useForm } from "@/hooks";

import { BaseField, BaseFieldProps } from "./Base";

export function EnumField(props: Omit<BaseFieldProps<string>, "children">) {
  const { name, value, editable = true, enumValues } = props;

  const { update } = useForm();

  return (
    <BaseField {...props}>
      {editable ? (
        <>
          {enumValues.map((enumValue, index) => (
            <Radio
              key={index}
              name={name}
              value={enumValue.value}
              label={enumValue.label}
              defaultChecked={value === enumValue.value}
              onChange={(e) => {
                update({
                  [name]: e.target.value === "true",
                });
              }}
            />
          ))}
        </>
      ) : (
        props.value
      )}
    </BaseField>
  );
}
