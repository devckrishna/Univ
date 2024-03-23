import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { mentor_id } = await req.json();
    return NextResponse.json({data:mentor_id});
  } catch (err) {
    return NextResponse.json({
      message: "Error extracting the upcoming mentor bookings : " + err,
    });
  }
}