import { db } from "@/utils/db";
import { NextResponse } from "next/server";
import axios from 'axios';

export async function GET(req: Request) {
  try {
    const mentors = await db.mentor.findMany();
    return NextResponse.json({data:mentors});
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
      description,
      country,
      university,
      image,
      gender,
      rate
    } = await req.json();
    // const x = await CreateZoomMeeting(name);

    const newMentor = await db.mentor.create({
      data: {
        name,
        email,
        description,
        country,
        university,
        image,
        gender,
        rate,
        rating:5
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
