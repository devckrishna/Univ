import { db } from "@/utils/db";
import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export async function GET(req: Request) {
//   try {
//     const mentors = await db.mentor.findMany();
//     return NextResponse.json(mentors);
//   } catch (err) {
//     return NextResponse.json({
//       message: "Error finding the mentors {GET: api/mentor}",
//     });
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const {
      date,
      mentor_id,
      duration,
      start_time,
      end_time,
      // rate
    } = await req.json();

    const mentor = await db.mentor.findUnique({
        where: {id:mentor_id}
    });
   
    if(!mentor){
        return NextResponse.json({
            message: "Invalid credentials ! Unable to update slots",
          });
    }

    const newslot = await db.mentorBooking.create({
      data: {
        date,
        mentor_id,
        duration,
        start_time,
        end_time
        // rate
      },
    });

    await prisma?.mentor.update({
        where:{id:mentor_id},
        data:{
            availability:{
                connect:{id:newslot.id}
            }
        }
    })


    return NextResponse.json({ message: "Availability slots updated !",data:newslot});
  } catch (err) {
    // console.log(err);
    return NextResponse.json({
      message: "Error updating mentor slots {POST: api/mentor/:id/addSlots}",
      error: err,
    });
  }
}
