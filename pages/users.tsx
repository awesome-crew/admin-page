/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { MainLayout, ListTemplate } from "@/components/templates";

export default function Users() {
  return (
    <MainLayout>
      <ListTemplate
        name="user"
        buttons={[{ label: "전체 삭제", type: "danger", onClick: console.log }]}
        fields={[
          "id",
          {
            label: "프로필",
            render: (user) => (
              <img
                src={(user as any).avatarUrl}
                style={{ width: 50, height: 50, objectFit: "cover" }}
              />
            ),
          },
          { label: "닉네임", name: "nickname" },
          { label: "꿈", name: "dreamJob" },
          { label: "꿈소개", name: "description" },
          {
            label: "학교",
            value: (user) => {
              const school = ((user as any).schoolHistories as any[]).find(
                (v) => v.isAttending
              )?.school;
              if (!school) {
                return "-";
              }
              return school.name;
            },
          },
          { label: "가입일시", name: "createdAt" },
        ]}
        filters={[{ name: "isMento", type: "boolean" }]}
      />
    </MainLayout>
  );
}
