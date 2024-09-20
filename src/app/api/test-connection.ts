// pages/api/test-connection.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma"; // Adjust the import based on your setup

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Attempt to connect to the database
    await prisma.$connect();
    console.log("Database connection successful!");
    res.status(200).json({ message: "Database connection successful!" });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ message: "Database connection error", error });
  } finally {
    await prisma.$disconnect(); // Ensure we close the connection
  }
}
