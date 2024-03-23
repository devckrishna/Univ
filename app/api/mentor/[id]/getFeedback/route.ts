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
    const slots = await db.booking.findMany({
        where: {
          mentor_id: mentor?.id,
          menteeFeedbackFlag:true
        },
      });
      let newarr = [];
      for(let i=0;i<slots.length;i++){
        if(slots[i].menteeFeedbackFlag){
          const st = await db.student.findFirst({
            where:{id:slots[i].student_id}
          });
          newarr.push({image:st?.image,rating:slots[i].menteeFeedbackRating,description:slots[i].menteeFeedback,name:st?.name,id:st?.id});
        }
      }
      console.log(newarr);
    return NextResponse.json({data:newarr});
  } catch (err) {
    return NextResponse.json({
      message: "Error finding the mentor {GET: api/mentor/id}",
      error:err
    });
  }
}
