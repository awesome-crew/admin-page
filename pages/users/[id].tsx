import { useRouter } from "next/router";

import { DetailTemplate, MainLayout } from "@/components/templates";

import { User } from "@/models";

export default function UserDetail() {
  const router = useRouter();

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
      />
    </MainLayout>
  );
}
