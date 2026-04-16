import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession, unauthorized, notFound, badRequest } from "@/lib/api-utils";
import { z } from "zod";

const updateMilestoneSchema = z.object({
  name: z.string().min(1).optional(),
  phase: z.enum(["SCHEME", "PRELIMINARY", "CONSTRUCTION", "COMPLETION"]).optional(),
  description: z.string().optional().nullable(),
  dueDate: z.string().optional(),
  isCompleted: z.boolean().optional(),
  assigneeId: z.string().optional().nullable(),
  sortOrder: z.number().optional(),
});

type RouteParams = { params: Promise<{ id: string; milestoneId: string }> };

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const session = await getSession();
  if (!session) return unauthorized();

  const { milestoneId } = await params;
  const body = await request.json();
  const parsed = updateMilestoneSchema.safeParse(body);

  if (!parsed.success) {
    return badRequest(parsed.error.issues[0].message);
  }

  const existing = await prisma.milestone.findUnique({ where: { id: milestoneId } });
  if (!existing) return notFound("节点不存在");

  const data = parsed.data;
  const updateData: Record<string, unknown> = { ...data };

  if (data.dueDate) {
    updateData.dueDate = new Date(data.dueDate);
  }
  if (data.isCompleted !== undefined) {
    updateData.completedAt = data.isCompleted ? new Date() : null;
  }

  const milestone = await prisma.milestone.update({
    where: { id: milestoneId },
    data: updateData,
    include: {
      assignee: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(milestone);
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const session = await getSession();
  if (!session) return unauthorized();

  const { milestoneId } = await params;

  const existing = await prisma.milestone.findUnique({ where: { id: milestoneId } });
  if (!existing) return notFound("节点不存在");

  await prisma.milestone.delete({ where: { id: milestoneId } });

  return NextResponse.json({ success: true });
}
