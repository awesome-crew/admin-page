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
};
