import { db } from "@/utils/db";
import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { student_email,mentor_id,date,duration,start_time,end_time,amount } = await req.json();
    const student = await db.student.findFirst({
      where: {
        email: student_email,
      },
    });
    if(!student){
      return NextResponse.json({message:"No student email exists!"});
    }
    const id = student?.id;
    const newBooking = await db.booking.create({
        data:{
          student_id:id,
          mentor_id:mentor_id,
          duration,
          start_time,
          end_time,
          date,
          amount,
          mentorFeedbackFlag:false,
          mentorFeedback:"",
          menteeFeedbackFlag:false,
          menteeFeedbackRating:0,
          menteeFeedback:""
        }
    });
    
    await prisma?.mentor.update({
        where:{id:mentor_id},
        data:{
            bookings:{
                connect:{id:newBooking.id}
            }
        }
    })
    
    await prisma.student.update({
      where:{id:student.id},
      data:{
        bookings:{
          connect:{id:newBooking.id}
        }
      }
    });

    return NextResponse.json({data:newBooking,message:"booking added",statusCode:200});
  } catch (err) {
    return NextResponse.json({
      message: "Error finding the user {GET: api/student/addBooking}" + err,
    });
  }
}