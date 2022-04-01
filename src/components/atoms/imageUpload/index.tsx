/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { ChangeEvent, useState } from "react";

import { Loading } from "../Loading";
import { PlusIcon, XIcon } from "@/icons";

import { CommonService } from "@/services";

import styles from "./index.module.scss";

export type ImageUploadProps = {
  onUpload: (urls: string[]) => void;

  onClear?: () => void;
  value?: string;

  preview?: boolean;
  /** @default 'Upload' */
  uploadText?: string;
};

export function ImageUpload({
  onUpload,
  onClear,
  value,
  preview,
  uploadText = "Upload",
}: ImageUploadProps) {
  const [isUploading, setUploading] = useState(false);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (isUploading) {
      alert("업로드 중인 이미지가 있습니다");
      return;
    }

    try {
      setUploading(true);
      const files = Array.from<File>(e.target.files);
      const urls = await CommonService.upload(files);
      onUpload(urls);
    } catch {
      alert("이미지 업로드에 실패했습니다!");
    } finally {
      setUploading(false);
    }
  };

  const isPreviewVisible = !!value && preview;

  return (
    <div className={styles.wrapper}>
      {isPreviewVisible ? (
        <ImageUploadPreview src={value} onRemove={onClear} />
      ) : (
        <label className={styles.label}>
          {isUploading ? <Loading /> : <PlusIcon />}
          <p className={styles.text}>{uploadText}</p>
          <input type="file" onChange={handleChange} hidden />
        </label>
      )}
    </div>
  );
}

export function ImageUploadPreview({
  src,
  onRemove,
}: {
  src: string;
  onRemove: () => void;
}) {
  return (
    <div className={styles.preview}>
      <img src={src + "?w=256"} />
      <div className={styles.overlay} onClick={(e) => e.preventDefault()}>
        <XIcon
          onClick={(e) => {
            e.preventDefault();
            onRemove();
          }}
          fill="white"
        />
      </div>
    </div>
  );
}
