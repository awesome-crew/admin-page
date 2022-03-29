import { useRouter } from "next/router";

import { DetailTemplate, MainLayout } from "@/components/templates";

import { Authentication, Folder, Project, SchoolHistory, User } from "@/models";
import { useData } from "@/hooks";
import ListTable from "@/components/templates/ListTemplate/Table";

export default function UserDetail() {
  const router = useRouter();

  const id = Number(router.query.id);

  const authentications = useData<Authentication[]>(
    id && `/users/${id}/authentications`
  );
  const folders = useData<Folder[]>(id && `/users/${id}/folders`);
  const projects = useData<Project[]>(id && `/users/${id}/projects`);

  return (
    <MainLayout>
      <DetailTemplate
        name="user"
        title={(user: User) => `${user.nickname}(${user.dreamJob ?? "-"})`}
        pk={Number(router.query.id)}
        buttons={(user) => [
          {
            label: "퍼스텝에서 보기",
            type: "secondary",
            href: `https://firstep.im/portfolio/${user.id}`,
          },
        ]}
        fields={[
          { label: "ID", name: "id", editable: false },
          { label: "닉네임", name: "nickname" },
          { label: "프로필사진", name: "avatarUrl", type: "imageUrl" },
          { label: "꿈", name: "dreamJob" },
          {
            label: "꿈 소개",
            name: "description",
            type: "text",
          },
          { label: "팔로워 수", name: "followerCount" },
          { label: "팔로잉 수", name: "followCount" },
          { label: "멘토여부", name: "isMento" },
          { label: "공개여부", name: "isPublic" },
        ]}
        Extras={[
          {
            label: "학교 정보",
            render: (user) => (
              <ListTable<SchoolHistory>
                modelName="schoolHistory"
                data={user.schoolHistories}
                fields={[
                  { label: "이름", value: (record) => record.school.name },
                  { label: "시작년도", name: "startYear" },
                  { label: "종료년도", name: "endYear" },
                  { label: "재학중", name: "isAttending" },
                ]}
              />
            ),
          },
          {
            label: "계정 정보",
            render: () => (
              <ListTable<Authentication>
                modelName="authentication"
                data={authentications}
                fields={[
                  {
                    label: "구분",
                    value: (record) =>
                      ({ Apple: "애플", Kakao: "카카오", Email: "이메일" }[
                        record.type
                      ]),
                  },
                  { label: "이메일", value: (record) => record.email ?? "-" },
                ]}
              />
            ),
          },
          {
            label: "폴더",
            render: () => (
              <ListTable<Folder>
                modelName="folder"
                data={folders}
                fields={["id", { label: "이름", name: "name" }]}
              />
            ),
          },
          {
            label: "프로젝트",
            render: () => (
              <ListTable<Project>
                modelName="project"
                data={projects}
                fields={["id", { label: "제목", name: "name" }]}
              />
            ),
          },
        ]}
      />
    </MainLayout>
  );
}
