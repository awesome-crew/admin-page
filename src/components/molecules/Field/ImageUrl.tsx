/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useState } from "react";

import { useForm } from "@/hooks";
import { CommonService } from "@/services";
import { PlusIcon, SpinIcon } from "@/icons";

import { BaseField, BaseFieldProps } from "./Base";
import styles from "./ImageUrl.module.scss";

export function ImageUrlField(props: Omit<BaseFieldProps<string>, "children">) {
  const { name, value, editable = true } = props;

  const [isUploading, setUploading] = useState(false);

  const { form, update } = useForm();
  const currentValue = form[name] ?? value;

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (isUploading) {
      alert("업로드 중인 이미지가 있습니다");
      return;
    }

    try {
      setUploading(true);
      const [file] = Array.from<File>(e.target.files);
      const url = await CommonService.upload(file);
      update({
        [name]: url,
      });
    } catch {
      alert("이미지 업로드에 실패했습니다!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <BaseField {...props}>
      {!editable && (
        <div className={styles.image_wrapper}>
          <img src={currentValue} />
        </div>
      )}
      {editable && (
        <label className={styles.wrapper}>
          {currentValue && <img src={currentValue} />}
          {!currentValue && (
            <>
              {isUploading ? <SpinIcon /> : <PlusIcon />}
              <p className={styles.upload}>Upload</p>
            </>
          )}
          <input type="file" onChange={handleChange} hidden />
        </label>
      )}
    </BaseField>
  );
}
