import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 });

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: { apiUsage: true, usageLimit: true }
  });

  return NextResponse.json(user);
}
