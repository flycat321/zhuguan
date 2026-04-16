import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession, unauthorized, notFound, badRequest } from "@/lib/api-utils";
import { z } from "zod";

const updateProjectSchema = z.object({
  name: z.string().min(1).optional(),
  contractNo: z.string().optional().nullable(),
  contractAmount: z.number().optional().nullable(),
  clientName: z.string().min(1).optional(),
  clientContact: z.string().optional().nullable(),
  projectType: z.string().optional().nullable(),
  phase: z.enum(["SCHEME", "PRELIMINARY", "CONSTRUCTION", "COMPLETION"]).optional(),
  status: z.enum(["ACTIVE", "PAUSED", "COMPLETED", "ARCHIVED"]).optional(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  leadId: z.string().optional(),
  description: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  buildingArea: z.number().optional().nullable(),
});

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return unauthorized();

  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      lead: { select: { id: true, name: true, position: true } },
      members: {
        include: {
          user: { select: { id: true, name: true, position: true, department: true } },
        },
        orderBy: { joinedAt: "asc" },
      },
      milestones: {
        orderBy: [{ sortOrder: "asc" }, { dueDate: "asc" }],
        include: {
          assignee: { select: { id: true, name: true } },
        },
      },
      notes: {
        include: {
          author: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!project) return notFound("项目不存在");

  return NextResponse.json(project);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return unauthorized();

  const { id } = await params;
  const body = await request.json();
  const parsed = updateProjectSchema.safeParse(body);

  if (!parsed.success) {
    return badRequest(parsed.error.issues[0].message);
  }

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) return notFound("项目不存在");

  // 非 ADMIN 只能编辑自己负责的项目
  if (session.user.role !== "ADMIN" && existing.leadId !== session.user.id) {
    return NextResponse.json({ error: "只能编辑自己负责的项目" }, { status: 403 });
  }

  const data = parsed.data;
  const updateData: Record<string, unknown> = { ...data };

  if (data.startDate !== undefined) {
    updateData.startDate = data.startDate ? new Date(data.startDate) : null;
  }
  if (data.endDate !== undefined) {
    updateData.endDate = data.endDate ? new Date(data.endDate) : null;
  }

  const project = await prisma.project.update({
    where: { id },
    data: updateData,
    include: {
      lead: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(project);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return unauthorized();

  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "仅管理员可删除项目" }, { status: 403 });
  }

  const { id } = await params;

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) return notFound("项目不存在");

  await prisma.project.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
