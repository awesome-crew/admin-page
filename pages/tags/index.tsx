/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { MainLayout, ListTemplate } from "@/components/templates";

import { Tag } from "@/models";

export default function Tags() {
  return (
    <MainLayout>
      <ListTemplate<Tag>
        name="tag"
        fields={[
          "id",
          { label: "이름", name: "name" },
          { label: "Default 여부", name: "isDefault" },
          { label: "가입시 추천 여부", name: "isBase" },
          { label: "포트폴리오 수", name: "userCount" },
          { label: "프로젝트 수", name: "projectCount" },
        ]}
        filters={[
          { label: "Default 여부", name: "isDefault", type: "boolean" },
          { label: "가입시 추천 여부", name: "isBase", type: "boolean" },
        ]}
      />
    </MainLayout>
  );
}
