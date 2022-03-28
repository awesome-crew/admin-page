/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useState } from "react";

import { useForm } from "@/hooks";

import { BaseField, BaseFieldProps } from "./Base";
import { CommonService } from "@/services";

export function ImageUrlField(props: Omit<BaseFieldProps<string>, "children">) {
  const { name, value, editable = true } = props;

  const [isUploading, setUploading] = useState(false);

  const { form, update } = useForm();

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
      <img src={form[name] ?? value} />
      {editable && <input type="file" onChange={handleChange} />}
    </BaseField>
  );
}
