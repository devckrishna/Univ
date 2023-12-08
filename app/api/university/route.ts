import { db } from "@/utils/db";
import { NextResponse,NextRequest } from "next/server";

// export async function GET(req: Request) {
//   try {
//     const mentors = await db.mentor.findMany();
//     return NextResponse.json(mentors);
//   } catch (err) {
//     return NextResponse.json({
//       message: "Error finding the mentors {GET: api/mentor}",
//     });
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      password,
      description,
      images,
      bachelor_courses,
      masters_courses,
      address,
      website,
      // rate
    } = await req.json();
    const newuniversity = await db.university.create({
      data: {
        name,
        email,
        password,
        description,
        images,
        bachelor_courses,
        masters_courses,
        address,
        website
        // rate
      },
    });
    return NextResponse.json({ message: "Created Mentor", data: newuniversity });
  } catch (err) {
    // console.log(err);
    return NextResponse.json({
      message: "Error creating mentor {POST: api/university}",
      error: err,
    });
  }
}
