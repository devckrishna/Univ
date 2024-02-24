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

    const slots = await db.booking.findMany({
      where: {
        mentor_id: user?.id,
      },
    });

    const d = new Date();
    const hrs = d.getHours();
    const day = d.getDate();
    const filteredSlots = slots.filter((b) => (  ( new Date(b.date)>d ) || (new Date(b.date)==d && parseInt(b.start_time)>hrs) ) );
    return NextResponse.json({data:filteredSlots});
  } catch (err) {
    return NextResponse.json({
      message: "Error extracting the upcoming mentor bookings : " + err,
    });
  }
}