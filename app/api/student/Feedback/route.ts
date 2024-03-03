import { db } from "@/utils/db";
import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    const {
        bookingId,
        feedbackText,
        FeedbackRating
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
        menteeFeedbackFlag:true,
        menteeFeedback:feedbackText,
        menteeFeedbackRating:FeedbackRating
    }
   });

   let newRating = 0;
   let b = 0;
   let allbooks = await db.booking.findMany({
    where:{mentor_id:booking.mentor_id}
   });
   for(let i=0;i<allbooks.length;i++){
      if(allbooks[i].menteeFeedbackFlag){
        newRating = newRating + allbooks[i].menteeFeedbackRating
        b++;
      }
   }
   
  //  if(b>0){
      newRating = newRating/b;
      const mentor = await db.mentor.update({
        where:{id:booking.mentor_id},
        data:{
          rating:newRating
        }
      });
    // }
   
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
