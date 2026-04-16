import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession, unauthorized, notFound } from "@/lib/api-utils";

type RouteParams = { params: Promise<{ id: string; memberId: string }> };

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const session = await getSession();
  if (!session) return unauthorized();

  const { memberId } = await params;

  const existing = await prisma.projectMember.findUnique({ where: { id: memberId } });
  if (!existing) return notFound("成员不存在");

  await prisma.projectMember.delete({ where: { id: memberId } });

  return NextResponse.json({ success: true });
}
