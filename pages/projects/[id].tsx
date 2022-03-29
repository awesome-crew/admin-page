import { useRouter } from "next/router";

import { DetailTemplate, MainLayout } from "@/components/templates";

import { Project } from "@/models";

export default function ProjectDetail() {
  const router = useRouter();

  return (
    <MainLayout>
      <DetailTemplate<Project>
        name="project"
        title={(project) => project.name}
        pk={Number(router.query.id)}
        fields={[
          { label: "ID", name: "id", editable: false },
          { label: "제목", name: "name" },
          { label: "내용", name: "content", type: "text" },
        ]}
      />
    </MainLayout>
  );
}
