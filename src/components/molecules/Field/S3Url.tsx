/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useState } from "react";

import { useForm } from "@/hooks";
import { CommonService } from "@/services";

import { BaseField, BaseFieldProps } from "./Base";

export function S3UrlField(props: Omit<BaseFieldProps<string>, "children">) {
  const { name, value, editable = true } = props;

  const [isUploading, setUploading] = useState(false);

  const { form, update } = useForm();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (isUploading) {
      alert("업로드 중인 파일이 있습니다");
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
      alert("업로드에 실패했습니다!");
    } finally {
      setUploading(false);
    }
  };

  const url = form[name] ?? value;

  return (
    <BaseField {...props}>
      {url && (
        <a href={url} download target="_self">
          {url}
        </a>
      )}
      {editable && <input type="file" onChange={handleChange} />}
    </BaseField>
  );
}
