import { FunctionComponent, ReactNode } from "react";

import { Field, FieldProps } from "@/components/molecules";

type DetailFieldData<Model> =
  | {
      label: string;
      render: (model: Model) => ReactNode;
    }
  | FieldProps<Model[any]>;
export type DetailFieldsProps<Model> = {
  data: Model;
  fields: DetailFieldData<Model>[];
};

export default function DetailFields<Model>({
  data,
  fields,
}: DetailFieldsProps<Model>) {
  const renderField = (field: DetailFieldData<Model>) => {
    if ("render" in field) {
      const { label, render } = field;
      return (
        <Field.Base label={label} name={label}>
          {render(data)}
        </Field.Base>
      );
    }
    const value = field.value ?? data[field.name as keyof Model];

    let FieldComponent: FunctionComponent<any> = Field.String;

    if (field.type) {
      FieldComponent = {
        string: Field.String,
        number: Field.Number,
        text: Field.Text,
        imageUrl: Field.ImageUrl,
        s3Url: Field.S3Url,
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
