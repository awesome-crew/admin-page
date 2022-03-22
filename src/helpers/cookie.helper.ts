import cookie from "js-cookie";
import { IncomingMessage } from "http";

const isBrower = () => typeof window !== "undefined";

export const setCookie = <T>(
  key: string,
  value: T,
  options?: cookie.CookieAttributes
) => {
  if (isBrower()) {
    cookie.set(key, value.toString(), {
      path: "/",
      ...options,
    });
  }
};

export const removeCookie = (key: string) => {
  if (isBrower()) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key: string, req?: IncomingMessage): string => {
  return req && !isBrower()
    ? getCookieFromServer(key, req)
    : getCookieFromBrowser(key);
};

const getCookieFromBrowser = (key: string) => {
  return cookie.get(key);
};

const getCookieFromServer = (key: string, req: IncomingMessage) => {
  if (!req?.headers?.cookie) {
    return undefined;
  }
  const rawCookie = req?.headers?.cookie
    .split(";")
    .find((c: string) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return decodeURI(rawCookie.split("=")[1]);
};
