import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession, unauthorized, notFound } from "@/lib/api-utils";

type RouteParams = { params: Promise<{ id: string }> };

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const session = await getSession();
  if (!session) return unauthorized();

  const { id } = await params;
  const log = await prisma.workLog.findUnique({ where: { id } });
  if (!log) return notFound("记录不存在");

  // 只能删除自己的记录（ADMIN 可删全部）
  if (session.user.role !== "ADMIN" && log.userId !== session.user.id) {
    return NextResponse.json({ error: "无权限" }, { status: 403 });
  }

  await prisma.workLog.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
