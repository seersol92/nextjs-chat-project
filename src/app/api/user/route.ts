// app/api/user/update/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth/next";
import { options } from "./../auth/[...nextauth]/options";

 async function updateSession(updatedData: any) {
  const session = await getServerSession(options);

  if (!session) {
    throw new Error("No session found");
  }
  session.user = { ...session.user, ...updatedData };

}

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const session = await getServerSession(options);
    if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, currentPassword, newPassword } = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 401 },
      );
    }

    const updatedData: any = { name };

    // Update password if newPassword is provided
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updatedData.password = hashedPassword;
    }

    await prisma.user.update({
      where: { email: session.user.email },
      data: updatedData,
    });


    await updateSession({name});

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
