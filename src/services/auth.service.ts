import { CookieKey } from "../constants";
import { removeCookie, setCookie } from "../helpers";

import { api } from "./base.service";

type JwtToken = {
  access: string;
  refresh: string;
};

const setTokens = (token: JwtToken) => {
  setCookie(CookieKey.ACCESS_TOKEN, token.access);
  setCookie(CookieKey.REFRESH_TOKEN, token.refresh);
};
const removeTokens = () => {
  removeCookie(CookieKey.ACCESS_TOKEN);
  removeCookie(CookieKey.REFRESH_TOKEN);
};

class AuthService {
  async signin(code: string, password: string) {
    const tokens = await api.post<JwtToken>("/auth/sign-in", {
      code,
      password,
    });
    setTokens(tokens);
  }

  async signout() {
    removeTokens();
  }
}

export default new AuthService();
