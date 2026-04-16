import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession, unauthorized, badRequest } from "@/lib/api-utils";
import { z } from "zod";

const createWorklogSchema = z.object({
  projectId: z.string().min(1, "请选择项目"),
  date: z.string().min(1, "请选择日期"),
  hours: z.number().min(0.5, "工时至少0.5小时").max(24),
  content: z.string().min(1, "请填写工作内容"),
  category: z.string().optional().nullable(),
});

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return unauthorized();

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || session.user.id;
  const projectId = searchParams.get("projectId");

  // 非 ADMIN 只能查看自己的记录
  const targetUserId =
    session.user.role === "ADMIN" ? userId : session.user.id;

  const where: Record<string, unknown> = { userId: targetUserId };
  if (projectId) where.projectId = projectId;

  const logs = await prisma.workLog.findMany({
    where,
    include: {
      project: { select: { id: true, name: true } },
      user: { select: { id: true, name: true } },
    },
    orderBy: { date: "desc" },
    take: 100,
  });

  return NextResponse.json(logs);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return unauthorized();

  const body = await request.json();
  const parsed = createWorklogSchema.safeParse(body);

  if (!parsed.success) {
    return badRequest(parsed.error.issues[0].message);
  }

  const data = parsed.data;

  const log = await prisma.workLog.create({
    data: {
      userId: session.user.id,
      projectId: data.projectId,
      date: new Date(data.date),
      hours: data.hours,
      content: data.content,
      category: data.category ?? null,
    },
    include: {
      project: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(log, { status: 201 });
}
