export type FieldType =
  | "number"
  | "string"
  | "text"
  | "imageUrl"
  | "s3Url"
  | "boolean";

export type FieldProps<Value> = {
  name: string;
  type?: FieldType;
  label?: string;
  value?: Value;
  /** @default true */
  editable?: boolean;
  /** string,text type인 경우, value의 최대길이제한울 위해 사용 */
  maxLength?: number;
};
