import { db } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request,{ params }: { params: { id: string } }) {
        try {
            const PostId = params.id;
            const post = await db.post.findUnique({
              where: { id: PostId },
            });
            return NextResponse.json({data:post,message:"Post found successfully",statusCode:200});
        } catch (err) {
            return NextResponse.json({
              message: "Error finding the Post {GET: api/posts/:id}",
              error:err,
              statusCode: 404
            });
        }
}