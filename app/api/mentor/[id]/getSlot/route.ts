import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request,{ params }: { params: { id: string } }) {
  try {
    const mentorId = params.id;
    const mentor = await db.mentor.findUnique({
      where: { id: mentorId },
    });
    const slots = await db.mentorBooking.findMany({
        where: {
          mentor_id: mentor?.id,
        },
      });
    return NextResponse.json({data:slots});
  } catch (err) {
    return NextResponse.json({
      message: "Error finding the mentor {GET: api/mentor/id}",
      error:err
    });
  }
}
