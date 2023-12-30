import { db } from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';


export async function POST(request: Request) {
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
        const isPasswordValid = await bcrypt.compare(password, university.password);
        if(!isPasswordValid){
            return NextResponse.json({
                message: "Invalid credentials ! Incorrect Password",
            });
        }
      }

      return NextResponse.json({message:'login successful',data:university});
}