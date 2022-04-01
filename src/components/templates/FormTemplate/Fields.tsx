import { FunctionComponent, ReactNode } from "react";

import { Field, FieldProps } from "@/components/molecules";

export type FormFieldData<Model> = Pick<
  FieldProps<Model[any]>,
  "label" | "name" | "type" | "maxLength" | "editable" | "enumValues"
> & {
  value?: any | ((model: Model) => any);
  render?: (model: Model) => ReactNode;
};
export type FormFieldsProps<Model> = {
  data?: Model;
  fields: FormFieldData<Model>[];
};

export default function FormFields<Model>({
  data,
  fields,
}: FormFieldsProps<Model>) {
  const renderField = (field: FormFieldData<Model>) => {
    if ("render" in field) {
      const { label, render } = field;
      return (
        <Field.Base label={label} name={label}>
          {render(data)}
        </Field.Base>
      );
    }

    const value = field.value
      ? typeof field.value === "function" && data
        ? field.value(data)
        : field.value
      : data
      ? data[field.name as keyof Model]
      : null;

    let FieldComponent: FunctionComponent<any> = Field.String;

    if (field.type) {
      FieldComponent = {
        string: Field.String,
        number: Field.Number,
        text: Field.Text,
        imageUrl: Field.ImageUrl,
        s3Url: Field.S3Url,
        boolean: Field.Boolean,
        imageUrlArray: Field.ImageUrlArray,
        enum: Field.Enum,
      }[field.type];
    } else {
      if (value != null) {
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
    }

    return <FieldComponent key={field.label} {...field} value={value} />;
  };

  return <>{fields.map(renderField)}</>;
}
