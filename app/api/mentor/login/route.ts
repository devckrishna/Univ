import { db } from "@/utils/db";
import { NextResponse } from "next/server";


export async function POST(
    request: Request,
    { params }: { params: { email:string, password:string } }
  ) {
    // try {
    const email = params.email;
    const mentor = await db.mentor.findFirst({
        where : {email: email as string}
    })
      if(!mentor){
          return NextResponse.json({
            message: "Invalid credentials ! Incorrect email Id",
          });
      }else {
        if(mentor.password != params.password){
            return NextResponse.json({
                message: "Invalid credentials ! Incorrect Password",
            });
        }
      }

      return NextResponse.json(mentor);
    
}