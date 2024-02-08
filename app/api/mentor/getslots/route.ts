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

    const bookings = await db.booking.findMany({
      where: {
        mentor_id: user?.id,
      },
    });
    return NextResponse.json({data:bookings});
  } catch (err) {
    return NextResponse.json({
      message: "Error finding the user {GET: api/user/mentor/getslot}" + err,
    });
  }
}