import { FormTemplate, MainLayout } from "@/components/templates";

import { api } from "@/services";

export default function CreateMentorPage() {
  return (
    <MainLayout>
      <FormTemplate
        title="멘토 계정 생성"
        onSubmit={async (form) => {
          await api.post("/admin/users/mentor", form);
          alert("생성되었습니다.");
          history.back();
        }}
        fields={[
          { label: "이메일", name: "email", type: "string" },
          {
            label: "비밀번호",
            name: "password",
            type: "string",
            maxLength: 12,
          },
        ]}
      />
    </MainLayout>
  );
}
