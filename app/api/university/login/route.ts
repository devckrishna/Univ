import { db } from "@/utils/db";
import { NextResponse } from "next/server";



export async function POST(
    request: Request,
    // { params }: { params: { email:string, password:string } }
  ) {
    // try {
    const {email,password} = await request.json();
    const university = await db.university.findFirst({
        where : {email: email as string}
    })
      if(!university){
          return NextResponse.json({
            message: "Invalid credentials ! Incorrect email Id",
          });
      }else {
        if(university.password != password){
            return NextResponse.json({
                message: "Invalid credentials ! Incorrect Password",
            });
        }
      }

      return NextResponse.json(university);
    
}