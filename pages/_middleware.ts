import { NextRequest, NextResponse } from "next/server";

import config from "../admin.config.json";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/login") {
    return NextResponse.next();
  }

  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      throw new Error("로그인 안 되어있음");
    }

    await fetch(config.apiUrl + "/auth/verify", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    });

    return NextResponse.next();
  } catch (err) {
    console.log(err);
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
