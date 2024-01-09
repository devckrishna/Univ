import { db } from "@/utils/db";
import { NextResponse } from "next/server";
import axios from 'axios';

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
