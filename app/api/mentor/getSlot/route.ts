import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { mentor_id } = await req.json();
    const user = await db.mentor.findFirst({
      where: {
        id: mentor_id,
      },
    });
    console.log("backend mentor is ",user);
    const slots = await db.booking.findMany({
      where: {
        mentor_id: user?.id,
      },
    });
    console.log("all slots data is",slots);
    const d = new Date();
    const hrs = d.getHours();
    const day = d.getDate();
    const filteredSlots = slots.filter((b) => (  ( new Date(b.date)>d ) || (new Date(b.date)==d && parseInt(b.start_time)>hrs) ) );
    return NextResponse.json({data:[]});
  } catch (err) {
    return NextResponse.json({
      message: "Error extracting the upcoming mentor bookings : " + err,
    });
  }
}