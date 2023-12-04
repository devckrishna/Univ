import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const mentorId = params.id;
    const mentor = await db.mentor.findUnique({
      where: { id: mentorId },
    });
    return NextResponse.json(mentor);
  } catch (err) {
    return NextResponse.json({
      message: "Error finding the mentor {GET: api/mentor/id}",
    });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const mentorId = params.id;
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
    const updatedMentor = await db.mentor.update({
      where: { id: mentorId },
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
    return NextResponse.json({
      message: "mentor updated",
      data: updatedMentor,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Error updating mentor {PUT: api/mentor/id}",
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const mentorId = params.id;
    const deletedMentor = await db.mentor.delete({
      where: { id: mentorId },
    });
    return NextResponse.json({ message: "Delete Mentor", data: deletedMentor });
  } catch (err) {
    return NextResponse.json({
      message: "Error deleting {DELETE: api/mentor/id}",
    });
  }
}
