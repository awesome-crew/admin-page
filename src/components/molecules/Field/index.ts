import { BaseField } from "./Base";
import { BooleanField } from "./Boolean";
import { EnumField } from "./Enum";
import { ImageUrlField } from "./ImageUrl";
import { NumberField } from "./Number";
import { S3UrlField } from "./S3Url";
import { StringField } from "./String";
import { TextField } from "./Text";
import { ImageUrlArrayField } from "./ImageUrlArray";
import { StringArrayField } from "./StringArray";

export * from "./type";

export const Field = {
  Base: BaseField,
  Boolean: BooleanField,
  Enum: EnumField,
  ImageUrl: ImageUrlField,
  Number: NumberField,
  S3Url: S3UrlField,
  String: StringField,
  Text: TextField,
  ImageUrlArray: ImageUrlArrayField,
  StringArray: StringArrayField,
};
