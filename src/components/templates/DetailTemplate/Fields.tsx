import { FunctionComponent } from "react";

import { Field, FieldProps } from "@/components/molecules";

export type DetailFieldsProps<Model> = {
  data: Model;
  fields: FieldProps<Model[any]>[];
};

export default function DetailFields<Model>({
  data,
  fields,
}: DetailFieldsProps<Model>) {
  const renderField = (field: FieldProps<Model[any]>) => {
    const value = field.value ?? data[field.name as keyof Model];

    let FieldComponent: FunctionComponent<any> = Field.String;

    if (field.type) {
      FieldComponent = {
        string: Field.String,
        number: Field.Number,
        text: Field.Text,
        imageUrl: Field.ImageUrl,
        s3Url: Field.String,
        boolean: Field.Boolean,
      }[field.type];
    } else {
      if (typeof value === "string") {
        FieldComponent = Field.String;
      }
      if (typeof value === "number") {
        FieldComponent = Field.Number;
      }
      if (typeof value === "boolean") {
        FieldComponent = Field.Boolean;
      }
    }

    return <FieldComponent key={field.label} {...field} value={value} />;
  };

  return <>{fields.map(renderField)}</>;
}
