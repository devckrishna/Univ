import { db } from "@/utils/db";
import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const {
      date,
      mentor_id,
      duration,
      start_time,
      end_time,
    } = await req.json();

    const mentor = await db.mentor.findUnique({
        where: {id:mentor_id}
    });
   
    if(!mentor){
        return NextResponse.json({
            message: "Invalid credentials ! Unable to update slots",
            statusCode:401
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

    return NextResponse.json({ message: "Availability slots updated !",data:newslot,statusCode:200});
  } catch (err) {
    // console.log(err);
    return NextResponse.json({
      message: "Error updating mentor slots {POST: api/mentor/:id/addSlots}",
      error: err,
      statusCode:404
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {

    const {date,mentor_id,start_time,end_time,duration} = await req.json();
    const mentor = await db.mentor.findUnique({
      where: {id:mentor_id}
    });
    console.log(mentor);
    if(!mentor){
      return NextResponse.json({
          message: "Invalid credentials ! Unable to update slots",
          statusCode:401
        });
    }

    const todeleterecord = await prisma.mentorBooking.findFirst({
      where:{
        mentor_id:mentor.id,
        date:date,
        start_time: start_time,
        end_time: end_time,
        duration: duration,
      }
    });
    console.log(todeleterecord);
    if(!todeleterecord){
      return NextResponse.json({message:"No such slot exists",statusCode:404});
    }

    const deletedBooking  = await prisma.mentorBooking.delete({
      where:{id:todeleterecord?.id}
    })
    console.log(deletedBooking);

    // const mentorId = deletedBooking?.mentor_id;
    //   const updatedMentor = await prisma.mentor.update({
    //     where: {
    //       id: mentorId,
    //       email:mentor.email
    //     },
    //     data: {
    //       availability: {
    //         // Remove the deleted booking from the array
    //         disconnect: [{id:deletedBooking.id}],
    //       },
    //     },
    //   });
    //   console.log(updatedMentor);
      return NextResponse.json({message:"deleted the entry successfully",statusCode:200,deletedBooking:deletedBooking});

  }catch(err){
    return NextResponse.json({
      message: "Unable to delete the mentor availability slot from backend",
      error: err,
      statusCode:404
    });
  }
}