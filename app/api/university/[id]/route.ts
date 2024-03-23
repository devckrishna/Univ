import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const UniversityId = params.id;
    const university = await db.university.findUnique({
      where: { id: UniversityId },
    });
    return NextResponse.json({data:university});
  } catch (err) {
    return NextResponse.json({
      message: "Error finding the University {GET: api/University/id}",
      error:err
    });
  }
}
