import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const user = await db.mentor.findFirst({
      where: {
        email: email,
      },
    });

    let slots = await db.booking.findMany({
      where: {
        mentor_id: user?.id,
      },
    });

    // if(slots.length>0){
      // slots = slots.map((s)=>{
      //   let studentd = db.student.findFirst({
      //     where:{id:s.student_id}
      //   })
      //   s.student_name = studentd.name
      //   return s;
      // });
    // }


    return NextResponse.json({data:slots});
  } catch (err) {
    return NextResponse.json({
      message: "Error extracting the upcoming mentor bookings : " + err,
    });
  }
}