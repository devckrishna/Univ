import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const students = await db.student.findMany();
    return NextResponse.json(students);
  } catch (err) {
    return NextResponse.json({
      message: "Error finding the students {GET: api/student}",
    });
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, password, description, country, image, gender } =
      await req.json();
    const newStudent = await db.student.create({
      data: {
        name,
        email,
        password,
        description,
        country,
        image,
        gender,
        // bookings:{[] as Array},
        // feedbacks:[] as Array
      },
    });
    return NextResponse.json({ message: "Created Student", data: newStudent });
  } catch (err) {
    // console.log(err);
    return NextResponse.json({
      message: "Error creating mentor {POST: api/student}",
      error: err,
    });
  }
}
