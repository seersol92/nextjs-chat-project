// pages/api/test-connection.ts
import prisma from "@/lib/prisma"; // Adjust the import based on your setup
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Attempt to connect to the database
    await prisma.$connect();
    console.log("Database connection successful!");
    return NextResponse.json(
      { message: "Database connection successful!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { message: "Database connection eror" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect(); // Ensure we close the connection
  }
}
