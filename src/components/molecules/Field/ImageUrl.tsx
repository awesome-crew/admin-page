/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useEffect, useRef, useState } from "react";

import { Loading } from "@/components/atoms";
import { PlusIcon, XIcon } from "@/icons";

import { useForm } from "@/hooks";
import { CommonService } from "@/services";

import { BaseField, BaseFieldProps } from "./Base";
import styles from "./ImageUrl.module.scss";

export function ImageUrlField(props: Omit<BaseFieldProps<string>, "children">) {
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

  const resetValue = () => {
    update({
      [name]: null,
    });
  };

  const Overlay = () => {
    return (
      <div className={styles.overlay} onClick={(e) => e.preventDefault()}>
        <button
          onClick={(e) => {
            e.preventDefault();
            inputRef.current.click();
          }}
        >
          <PlusIcon style={{ width: 24 }} fill="white" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            resetValue();
          }}
        >
          <XIcon style={{ width: 24 }} fill="white" />
        </button>
      </div>
    );
  };

  return (
    <BaseField {...props}>
      {editable ? (
        <label>
          <div className={styles.wrapper}>
            {form[name] ? (
              <>
                <img src={form[name]} />
                <Overlay />
              </>
            ) : (
              <>
                {isUploading ? <Loading /> : <PlusIcon />}
                <p className={styles.upload}>Upload</p>
              </>
            )}
            <input type="file" ref={inputRef} onChange={handleChange} hidden />
          </div>
        </label>
      ) : (
        <div className={styles.image_wrapper}>
          <img src={form[name]} />
        </div>
      )}
    </BaseField>
  );
}
