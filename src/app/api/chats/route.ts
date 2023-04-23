import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function GET(request: Request) {
    const chats = await prisma.chat.findMany({
        orderBy: {
            created_at: "asc",
        }
    });

    return NextResponse.json(chats)
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const message = body?.message;

    if (!message) {
        return NextResponse.json({
            error: true,
            status: 419,
            message: "You need to provide some message!"
        });
    }

    const chat = await prisma.chat.create({
        data: {
            message: message
        }
    });

    return NextResponse.json(chat);
}