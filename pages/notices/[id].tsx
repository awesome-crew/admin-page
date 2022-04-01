import { useRouter } from "next/router";

import { DetailTemplate, MainLayout } from "@/components/templates";

import { Notice } from "@/models";

import { TYPE_ENUM_VALUES } from ".";

export default function NoticeDetail() {
  const router = useRouter();

  return (
    <MainLayout>
      <DetailTemplate<Notice>
        name="notice"
        title={(notice: Notice) => notice.title}
        pk={Number(router.query.id)}
        fields={[
          { label: "ID", name: "id", editable: false },
          { label: "제목", name: "title" },
          { label: "설명", name: "description" },
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
