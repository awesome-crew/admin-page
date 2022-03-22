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

    const {
      data: { me },
    } = await fetch(config.apiUrl + "/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    }).then(async (response) => await response.json());

    if (!me) {
      throw new Error("권한 없음");
    }

    return NextResponse.next();
  } catch (err) {
    console.log(err);
    return NextResponse.redirect(`/login`);
  }
}
