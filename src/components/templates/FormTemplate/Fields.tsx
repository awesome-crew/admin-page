import { FunctionComponent } from "react";

import { Field, FieldProps } from "@/components/molecules";

export type FormFieldsProps<Model> = {
  fields: Pick<
    FieldProps<Model[any]>,
    "label" | "name" | "type" | "maxLength"
  >[];
};

export default function FormFields<Model>({ fields }: FormFieldsProps<Model>) {
  const renderField = (field: FieldProps<Model[any]>) => {
    let FieldComponent: FunctionComponent<any> = Field.String;

    FieldComponent = {
      string: Field.String,
      number: Field.Number,
      text: Field.Text,
      imageUrl: Field.ImageUrl,
      s3Url: Field.S3Url,
      boolean: Field.Boolean,
    }[field.type];

    return <FieldComponent key={field.label} {...field} />;
  };

  return <>{fields.map(renderField)}</>;
}
