import { db } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const posts = await db.post.findMany();
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({
      message: "Error finding the mentors {GET: api/post}",
    });
  }
}


export async function POST(req: NextRequest) {
  try {
    let {
      title,
      email,
      description,
      images
    } = await req.json();

    console.log('images at backend are : ', images);
    const university = await db.university.findFirst({
      where: {
        email: email,
      },
    });
    
    if(!university){
      return NextResponse.json({message:"No University email exists!"});
    }
    // const imageUrls = [];

    // for (const image of images) {
    //   const result = await cloudinary.uploader.upload(image.path, {
    //     // upload_preset: 'your_upload_preset',
    //   });
    //   imageUrls.push(result.secure_url);
    // }

    const newPost = await db.post.create({
      data:{
        title:title,
        images:images,
        description:description,
        university_name:university.name,
        university_id:university.id
      }
    })

    await prisma?.university.update({
      where:{id:university.id},
      data:{
        posts:{
          connect:{id:newPost.id}
        }
      }
    })

    return NextResponse.json({ message: "Created New Post", data: newPost });
  } catch (err) {
    return NextResponse.json({
      message: "Error creating Post {POST: api/post}",
      error: err,
    });
  }
}

