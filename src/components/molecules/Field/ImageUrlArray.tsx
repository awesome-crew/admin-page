/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";

import { BaseField, BaseFieldProps } from "./Base";
import { ImageUpload, ImageUploadPreview } from "@/components/atoms";

import { useForm } from "@/hooks";

import styles from "./ImageUrlArray.module.scss";

export function ImageUrlArrayField(
  props: Omit<BaseFieldProps<string[]>, "children">
) {
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

  const remove = (url: string) => {
    if (!form[name]) {
      return;
    }
    if (form[name].length === 1) {
      clear();
      return;
    }

    update({
      [name]: form[name].filter((v: string) => v !== url),
    });
  };

  const urls: string[] = form[name] ?? value ?? [];

  return (
    <BaseField {...props}>
      <div className={styles.wrapper}>
        {urls.map((url) => (
          <div className={styles.previewWrapper} key={url}>
            <ImageUploadPreview src={url} onRemove={() => remove(url)} />
          </div>
        ))}
        {editable && (
          <ImageUpload
            onUpload={([url]) => {
              update({
                [name]: [...(form[name] ?? []), url],
              });
            }}
            onClear={clear}
            value={form[name]}
            uploadText="추가하기"
          />
        )}
      </div>
    </BaseField>
  );
}
