import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const mentors = await db.mentor.findMany();
    return NextResponse.json(mentors);
  } catch (err) {
    return NextResponse.json({
      message: "Error finding the mentors {GET: api/mentor}",
    });
  }
}

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      password,
      description,
      country,
      university,
      image,
      gender,
      rating,
    } = await req.json();
    const newMentor = await db.mentor.create({
      data: {
        name,
        email,
        password,
        description,
        country,
        university,
        image,
        gender,
        rating,
      },
    });
    return NextResponse.json({ message: "Created Mentor", data: newMentor });
  } catch (err) {
    // console.log(err);
    return NextResponse.json({
      message: "Error creating mentor {POST: api/mentor}",
      error: err,
    });
  }
}
