/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";

import { BaseField, BaseFieldProps } from "./Base";
import { ImageUpload } from "@/components/atoms";

import { useForm } from "@/hooks";

import styles from "./ImageUrl.module.scss";

export function ImageUrlField(props: Omit<BaseFieldProps<string>, "children">) {
  const { name, value, editable = true } = props;

  const { form, update } = useForm();

  useEffect(() => {
    update({
      [name]: value,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clear = () => {
    update({
      [name]: null,
    });
  };

  return (
    <BaseField {...props}>
      {editable ? (
        <ImageUpload
          onUpload={([url]) => {
            update({
              [name]: url,
            });
          }}
          onClear={clear}
          value={form[name]}
          preview
        />
      ) : (
        <div className={styles.image_wrapper}>
          <img src={form[name]} />
        </div>
      )}
    </BaseField>
  );
}
