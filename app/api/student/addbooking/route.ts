import { db } from "@/utils/db";
import { NextResponse,NextRequest } from "next/server";

// const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { student_email,mentor_id,date,duration,start_time,end_time } = await req.json();
    const student = await db.student.findFirst({
      where: {
        email: student_email,
      },
    });
    const id = student?.id;
    const newBooking = await db.booking.create({
      data:{
        student_id:id,
        mentor_id:mentor_id,
        duration,
        start_time,
        end_time,
        date:date
      },
    });
    
    return NextResponse.json({data:newBooking});
  } catch (err) {
    return NextResponse.json({
      message: "Error finding the user {GET: api/user/mentor/getslot}" + err,
    });
  }
}