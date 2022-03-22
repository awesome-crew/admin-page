import { CookieKey } from "../constants";
import { removeCookie, setCookie } from "../helpers";

import { api } from "./base.service";

class AuthService {
  async signin(code: string, password: string) {
    const token = await api.post<string>("/auth/sign-in", {
      code,
      password,
    });
    setCookie(CookieKey.ACCESS_TOKEN, token);
  }

  async signout() {
    removeCookie(CookieKey.ACCESS_TOKEN);
  }

  async verify() {
    return await api.get<true>("/auth/verify");
  }
}

export default new AuthService();
