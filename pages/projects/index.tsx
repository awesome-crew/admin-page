/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { ListTemplate, MainLayout } from "@/components/templates";
import { Project } from "@/models";

export default function Projects() {
  return (
    <MainLayout>
      <ListTemplate<Project>
        name="project"
        fields={[
          "id",
          { label: "제목", name: "name" },
          { label: "작성자", value: (project) => project.user.nickname },
          { label: "작성일시", name: "createdAt" },
        ]}
      />
    </MainLayout>
  );
}
