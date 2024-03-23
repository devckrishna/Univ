import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const mentorId = params.id;
    const mentor = await db.mentor.findUnique({
      where: { id: mentorId },
    });
    return NextResponse.json({data:mentor});
  } catch (err) {
    return NextResponse.json({
      message: "Error finding the mentor {GET: api/mentor/id}",
      error:err
    });
  }
}
