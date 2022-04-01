import { FunctionComponent } from "react";

import { Field, FieldProps } from "@/components/molecules";

export type FormFieldsProps<Model> = {
  data?: Model;
  fields: Array<
    Pick<FieldProps<Model[any]>, "label" | "name" | "type" | "maxLength"> & {
      value?: any | ((model: Model) => any);
    }
  >;
};

export default function FormFields<Model>({
  data,
  fields,
}: FormFieldsProps<Model>) {
  const renderField = (field: FieldProps<Model[any]>) => {
    let FieldComponent: FunctionComponent<any> = Field.String;

    FieldComponent = {
      string: Field.String,
      number: Field.Number,
      text: Field.Text,
      imageUrl: Field.ImageUrl,
      s3Url: Field.S3Url,
      boolean: Field.Boolean,
      imageUrlArray: Field.ImageUrlArray,
    }[field.type];

    let defaultValue;
    if (field.value) {
      defaultValue =
        typeof field.value === "function" ? field.value(data) : field.value;
    }

    return <FieldComponent key={field.label} {...field} value={defaultValue} />;
  };

  return <>{fields.map(renderField)}</>;
}
