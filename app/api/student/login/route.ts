import { db } from "@/utils/db";
import { NextResponse } from "next/server";


export async function POST(
    request: Request,
    // { params }: { params: { email:string, password:string } }
  ) {
    // try {
    const {email,password} = await request.json();
    const student = await db.student.findUnique({
        where : {email},
    })
    // const student = await db.student.findFirst({
    //     where : {email:studentemail as string},
    // })
      if(!student){
          return NextResponse.json({
            message: "Invalid credentials ! Incorrect email Id",
          });
      }else {
        if(student.password != password){
            return NextResponse.json({
                message: "Invalid credentials ! Incorrect Password",
            });
        }
      }

      return NextResponse.json(student);
    
}