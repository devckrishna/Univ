import { db } from "@/utils/db";
import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    const {
        bookingId,
        feedbackText
    } = await req.json();

   const booking = await prisma.booking.findUnique({
    where:{id:bookingId}
   });

   if(!booking){
    return NextResponse.json({message:' No such session found', statusCode: 404});
   }

   const newBooking = await db.booking.update({
    where:{id:bookingId},
    data:{
        mentorFeedbackFlag:true,
        mentorFeedback:feedbackText
    }
   });

    return NextResponse.json({ message: "Mentor Feedback updated !",data:newBooking,statusCode:200});
  } catch (err) {
    // console.log(err);
    return NextResponse.json({
      message: "Error updating mentor slots {POST: api/mentor/:id/addSlots}",
      error: err,
      statusCode:404
    });
  }
}
