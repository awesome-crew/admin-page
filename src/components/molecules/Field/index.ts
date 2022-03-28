import { BooleanField } from "./Boolean";
import { ImageUrlField } from "./ImageUrl";
import { NumberField } from "./Number";
import { StringField } from "./String";
import { TextField } from "./Text";

export * from "./type";

export const Field = {
  Number: NumberField,
  String: StringField,
  Text: TextField,
  Boolean: BooleanField,
  ImageUrl: ImageUrlField,
};
