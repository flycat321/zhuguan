import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession, unauthorized } from "@/lib/api-utils";

export async function GET() {
  const session = await getSession();
  if (!session) return unauthorized();

  const users = await prisma.user.findMany({
    where: { isActive: true },
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
      department: true,
      position: true,
    },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(users);
}
