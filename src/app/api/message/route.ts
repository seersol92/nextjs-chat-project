import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";

const prisma = new PrismaClient();
// Handle GET requests to fetch all leads
export async function GET() {
  try {
     const messages = await prisma.message.findMany();
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.log("Error fetching messages:", error);
    return NextResponse.json(
      { message: "Error fetching messages" },
      { status: 500 },
    );
  }
}


export async function PUT(request: Request) {
  const { text, options, id } = await request.json();
  console.log(text, options);
  try {
    const updatedMessage = await prisma.message.update({
      where: { id },
      data: { text, options },
    });
    return NextResponse.json("Updated", { status: 200 });
  } catch (error) {
    console.error("Error updating message:", error);
    return NextResponse.json("Error updating message", { status: 500 });
  }
}
