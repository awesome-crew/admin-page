import { BaseField } from "./Base";
import { BooleanField } from "./Boolean";
import { ImageUrlField } from "./ImageUrl";
import { NumberField } from "./Number";
import { S3UrlField } from "./S3Url";
import { StringField } from "./String";
import { TextField } from "./Text";

export * from "./type";

export const Field = {
  Base: BaseField,
  Number: NumberField,
  String: StringField,
  Text: TextField,
  Boolean: BooleanField,
  ImageUrl: ImageUrlField,
  S3Url: S3UrlField,
};
