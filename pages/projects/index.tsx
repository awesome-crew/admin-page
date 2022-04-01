/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { Badge } from "@/components/atoms";
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
          {
            label: "카테고리",
            render: (project) => (
              <Badge type="code">{project.category.name}</Badge>
            ),
          },
          {
            label: "작성자",
            render: (project) => (
              <a href={`/users/${project.userId}`}>{project.user.nickname}</a>
            ),
          },
          { label: "작성일시", name: "createdAt" },
        ]}
      />
    </MainLayout>
  );
}
