import { useForm } from "@/hooks";

import { BaseField, BaseFieldProps } from "./Base";

export function BooleanField(props: Omit<BaseFieldProps<boolean>, "children">) {
  const { name, value, editable = true } = props;

  const { update } = useForm();

  return (
    <BaseField {...props}>
      {editable ? (
        <>
          {[true, false].map((v, index) => (
            <div key={index}>
              <input
                id={name + v?.toString()}
                type="radio"
                name={name}
                value={v?.toString()}
                defaultChecked={value === v}
                onChange={(e) => {
                  update({
                    [name]: e.target.value === "true",
                  });
                }}
              />
              <label htmlFor={name + v?.toString()}>
                {v === true ? "네" : "아니오"}
              </label>
            </div>
          ))}
        </>
      ) : props.value ? (
        "네"
      ) : (
        "아니오"
      )}
    </BaseField>
  );
}
