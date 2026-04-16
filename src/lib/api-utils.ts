import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function getSession() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return session;
}

export function unauthorized() {
  return NextResponse.json({ error: "未授权" }, { status: 401 });
}

export function forbidden() {
  return NextResponse.json({ error: "无权限" }, { status: 403 });
}

export function notFound(message = "未找到") {
  return NextResponse.json({ error: message }, { status: 404 });
}

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}
