/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { MainLayout, ListTemplate } from "@/components/templates";

import { Notice } from "@/models";

export const TYPE_ENUM_VALUES = [
  {
    label: "일반",
    value: "General",
  },
  {
    label: "자주묻는질문",
    value: "Faq",
  },
];

export default function Notices() {
  return (
    <MainLayout>
      <ListTemplate<Notice>
        name="notice"
        fields={[
          "id",
          { label: "제목", name: "title" },
          { label: "유형", name: "type" },
        ]}
        filters={[
          {
            label: "유형",
            name: "type",
            type: "enum",
            enumValues: TYPE_ENUM_VALUES,
          },
        ]}
      />
    </MainLayout>
  );
}
