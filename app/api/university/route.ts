import { db } from "@/utils/db";
import cloudinary from "@/cloudinaryConfig";
import { NextResponse,NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let {
      name,
      email,
      description,
      images,
      bachelor_courses,
      masters_courses,
      address,
      website,
      // rate
    } = await req.json();

    console.log('images at backend are : ', images);
    // const imageUrls = [];

    // for (const image of images) {
    //   const result = await cloudinary.uploader.upload(image.path, {
    //     // upload_preset: 'your_upload_preset',
    //   });
    //   imageUrls.push(result.secure_url);
    // }

    bachelor_courses = bachelor_courses.split(",");
    masters_courses = masters_courses.split(",")

    const newuniversity = await db.university.create({
      data: {
        name,
        email,
        description,
        images,
        bachelor_courses,
        masters_courses,
        address,
        website,
      },
    });
    return NextResponse.json({ message: "Created University", data: newuniversity });
  } catch (err) {
    return NextResponse.json({
      message: "Error creating university {POST: api/university}",
      error: err,
    });
  }
}
