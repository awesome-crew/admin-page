import { Radio } from "@/components/atoms";
import { useForm } from "@/hooks";

import { BaseField, BaseFieldProps } from "./Base";

const BOOLEAN_VALUES = [
  {
    value: true,
    label: "네",
  },
  {
    value: false,
    label: "아니요",
  },
];

export function BooleanField(props: Omit<BaseFieldProps<boolean>, "children">) {
  const { name, value, editable = true } = props;

  const { update } = useForm();

  return (
    <BaseField {...props}>
      {editable ? (
        <>
          {BOOLEAN_VALUES.map((booleanValue, index) => (
            <Radio
              key={index}
              name={name}
              value={booleanValue.value?.toString()}
              label={booleanValue.label}
              defaultChecked={value === booleanValue.value}
              onChange={(e) => {
                update({
                  [name]: e.target.value === "true",
                });
              }}
            />
          ))}
        </>
      ) : (
        BOOLEAN_VALUES.find(({ value }) => value === props.value).label
      )}
    </BaseField>
  );
}
