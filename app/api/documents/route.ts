import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 });

    const { title } = await req.json();
    const user = await db.user.findUnique({ where: { email: session.user.email } });

    if (!user) return new NextResponse("User not found", { status: 404 });

    const doc = await db.document.create({
      data: {
        title: title || "Untitled Document",
        content: "",
        userId: user.id
      }
    });

    return NextResponse.json(doc);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 });

    const user = await db.user.findUnique({ where: { email: session.user.email } });
    if (!user) return new NextResponse("User not found", { status: 404 });

    const docs = await db.document.findMany({
        where: { userId: user.id },
        orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json(docs);
}
