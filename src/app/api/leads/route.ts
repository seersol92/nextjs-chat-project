import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const {
    tabType,
    operator,
    duration,
    displeasure,
    cost,
    engagement,
    name,
    surname,
    email,
  } = await request.json();
  console.log({
    tabType,
    operator,
    duration,
    displeasure,
    cost,
    engagement,
    name,
    surname,
    email,
  });
  // Validate the incoming data
  if (!operator || !duration) {
    return NextResponse.json(
      {
        message: "L'opérateur et la durée sont requis",
      },
      { status: 400 },
    );
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        type: tabType,
        operator,
        duration,
        displeasure,
        cost,
        engagement,
        name,
        surname,
        email,
      },
    });
    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.log("Error saving lead:", error);
    return NextResponse.json({ message: "Error saving lead" }, { status: 500 });
  }
}

// Handle GET requests to fetch all leads
export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: "desc", // Optional: order by creation date
      },
    });
    return NextResponse.json(leads, { status: 200 });
  } catch (error) {
    console.log("Error fetching leads:", error);
    return NextResponse.json(
      { message: "Error fetching leads" },
      { status: 500 },
    );
  }
}
