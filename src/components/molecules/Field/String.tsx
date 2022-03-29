import { ChangeEvent } from "react";

import { useForm } from "@/hooks";

import { BaseField, BaseFieldProps } from "./Base";
import styles from "./String.module.scss";

export function StringField(props: Omit<BaseFieldProps<string>, "children">) {
  const { name, value, editable = true, maxLength } = props;

  const { form, update } = useForm();
  const currentValue = form[name] ?? value;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    update({ [name]: e.target.value });
  };

  return (
    <BaseField {...props}>
      {editable ? (
        <div className={styles.wrapper}>
          <input
            name={name}
            maxLength={maxLength}
            defaultValue={value}
            onChange={handleChange}
          />
          {maxLength && (
            <p className={styles.count}>
              {currentValue?.length ?? 0} / {maxLength}
            </p>
          )}
        </div>
      ) : (
        value ?? "-"
      )}
    </BaseField>
  );
}
