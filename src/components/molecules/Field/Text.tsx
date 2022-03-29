import { ChangeEvent } from "react";

import { useForm } from "@/hooks";

import { BaseField, BaseFieldProps } from "./Base";
import styles from "./Text.module.scss";

export function TextField(props: Omit<BaseFieldProps<string>, "children">) {
  const { name, value, editable = true, maxLength } = props;

  const { form, update } = useForm();
  const currentValue = form[name] ?? value;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    update({ [name]: e.target.value });
  };

  return (
    <BaseField {...props}>
      {editable ? (
        <div className={styles.wrapper}>
          <textarea
            name={name}
            defaultValue={value}
            onChange={handleChange}
            maxLength={maxLength}
          />
          {maxLength && (
            <p className={styles.count}>
              {currentValue?.length ?? 0} / {maxLength}
            </p>
          )}
        </div>
      ) : (
        props.value
      )}
    </BaseField>
  );
}
