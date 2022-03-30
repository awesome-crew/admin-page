import { CookieKey } from "@/constants";
import { getCookie } from "@/helpers";

import { api } from "./base.service";

class CommonService {
  async upload(files: File[]) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    const urls = await api.post<string[]>("/common/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie(CookieKey.ACCESS_TOKEN)}`,
      },
    });
    return urls;
  }
}

export default new CommonService();
