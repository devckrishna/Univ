import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const studentId = params.id;
    const student = await db.student.findUnique({
      where: { id: studentId },
    });
    return NextResponse.json(student);
  } catch (err) {
    return NextResponse.json({
      message: "Error finding the students {GET: api/student/id}",
    });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const studentId = params.id;
    const { name, email, password, description, country, image, gender } =
      await req.json();
    const updatedStudent = await db.student.update({
      where: { id: studentId },
      data: {
        name,
        email,
        description,
        country,
        image,
        gender,
      },
    });
    // console.log(updatedStudent);
    return NextResponse.json({
      message: "student updated",
      data: updatedStudent,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Error Updating students {PUT: api/student/id}",
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const studentId = params.id;
    const deletedStudent = await db.student.delete({
      where: { id: studentId },
    });
    return NextResponse.json({
      message: "Delete Student",
      data: deletedStudent,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Error deleting the student {DELETE: api/mentor/id}",
    });
  }
}
