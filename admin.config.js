/** @type {import('./type').AdminConfig} */
const config = {
  name: "FIRSTEP",
  apiUrl: "https://server.firstep.im/admin",
  sections: [
    {
      name: "회원 관리",
      models: [
        {
          label: "유저(사용자)",
          name: "user",
          searchField: "nickname",
          create: true,
          delete: false,
          detail: true,
          edit: true,
        },
        {
          label: "신고 내역",
          name: "report",
        },
      ],
    },
    {
      name: "컨텐츠 관리",
      models: [
        {
          label: "태그(관심사)",
          name: "tag",
          searchField: "name",
          create: true,
          delete: true,
          detail: true,
          edit: true,
        },
        {
          label: "프로젝트",
          name: "project",
          searchField: "name",
          delete: true,
          detail: true,
          edit: true,
        },
      ],
    },
  ],
};

export default config;
