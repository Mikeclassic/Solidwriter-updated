import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const doc = await db.document.findUnique({ where: { id: params.id } });
    return NextResponse.json(doc);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });
    
    const { content, title } = await req.json();
    const doc = await db.document.update({
        where: { id: params.id },
        data: { content, title }
    });
    return NextResponse.json(doc);
}
