import { MainLayout, CreateTemplate } from "@/components/templates";

export default function TagCreate() {
  return (
    <MainLayout>
      <CreateTemplate
        name="tag"
        fields={[
          { label: "이름", name: "name", type: "string" },
          { label: "Default 여부", name: "isDefault", type: "boolean" },
          { label: "가입시 추천 여부", name: "isBase", type: "boolean" },
        ]}
      />
    </MainLayout>
  );
}
