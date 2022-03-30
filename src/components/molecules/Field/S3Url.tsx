/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useEffect, useRef, useState } from "react";

import { useForm } from "@/hooks";
import { UploadIcon, XIcon } from "@/icons";
import { CommonService } from "@/services";

import { BaseField, BaseFieldProps } from "./Base";
import styles from "./S3Url.module.scss";

export function S3UrlField(props: Omit<BaseFieldProps<string>, "children">) {
  const { name, value, editable = true } = props;

  const [isUploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const { form, update } = useForm();

  useEffect(() => {
    update({
      [name]: value,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (isUploading) {
      alert("업로드 중인 파일이 있습니다");
      return;
    }

    try {
      setUploading(true);
      const files = Array.from<File>(e.target.files);
      const [url] = await CommonService.upload(files);
      update({
        [name]: url,
      });
    } catch {
      alert("업로드에 실패했습니다!");
    } finally {
      setUploading(false);
    }
  };

  const resetValue = () => {
    update({
      [name]: null,
    });
  };

  return (
    <BaseField {...props}>
      {form[name] && (
        <div className={styles["upload-item"]}>
          <a href={form[name]} download target="_self">
            {form[name]}
          </a>
          {editable && (
            <button className={styles["reset-button"]} onClick={resetValue}>
              <XIcon />
            </button>
          )}
        </div>
      )}
      {editable && (
        <button
          className={styles["upload-button"]}
          onClick={() => {
            inputRef.current.click();
          }}
        >
          <UploadIcon />
          <p className={styles["upload-text"]}>Upload</p>
          <input type="file" ref={inputRef} onChange={handleChange} hidden />
        </button>
      )}
    </BaseField>
  );
}
