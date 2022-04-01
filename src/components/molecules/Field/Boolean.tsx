import { RadioGroup } from "@/components/atoms";
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
        <RadioGroup
          name={name}
          value={value}
          radioValues={BOOLEAN_VALUES}
          onChange={(e) => {
            update({ [name]: e.target.value === "true" });
          }}
        />
      ) : (
        BOOLEAN_VALUES.find(({ value }) => value === props.value).label
      )}
    </BaseField>
  );
}
