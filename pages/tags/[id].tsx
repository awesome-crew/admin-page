import { useRouter } from "next/router";

import { DetailTemplate, MainLayout } from "@/components/templates";

import { Tag } from "@/models";

export default function TagDetail() {
  const router = useRouter();

  return (
    <MainLayout>
      <DetailTemplate<Tag>
        name="tag"
        title={(tag: Tag) => tag.name}
        pk={Number(router.query.id)}
        buttons={(tag) => [
          {
            label: "퍼스텝에서 보기",
            type: "secondary",
            href: `https://firstep.im/tag/${tag.id}`,
          },
        ]}
        fields={[
          { label: "ID", name: "id", editable: false },
          { label: "이름", name: "name" },
          { label: "Default 여부", name: "isDefault" },
          { label: "가입시 추천 여부", name: "isBase" },
          { label: "포트폴리오 수", name: "userCount", editable: false },
          { label: "프로젝트 수", name: "projectCount", editable: false },
        ]}
      />
    </MainLayout>
  );
}
