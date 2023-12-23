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
      student_id,
      mentor_id,
      duration,
      start_time,
      end_time,
      // rate
    } = await req.json();

    const mentor = await db.mentor.findUnique({
        where: {id:mentor_id}
    });
    const student = await db.student.findUnique({
        where: {id:student_id}
    })

    if(!student || !mentor){
        return NextResponse.json({
            message: "Invalid credentials ! Unable to add booking",
            data : {
              student:student,
              mentor:mentor
            }
          });
    }

    const newbooking = await db.booking.create({
      data: {
        date,
        student_id,
        mentor_id,
        duration,
        start_time,
        end_time
        // rate
      },
    });

    await prisma?.student.update({
        where: {id:student_id},
        data:{
            bookings:{
                connect:{id:newbooking.id}
            }
        }
    });

    await prisma?.mentor.update({
        where:{id:mentor_id},
        data:{
            bookings:{
                connect:{id:newbooking.id}
            }
        }
    })


    return NextResponse.json({ message: "Booking added !", data:newbooking });
  } catch (err) {
    // console.log(err);
    return NextResponse.json({
      message: "Error creating mentor {POST: api/student/:id/addBooking}",
      error: err,
    });
  }
}
