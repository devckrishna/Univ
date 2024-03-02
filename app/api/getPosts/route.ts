import { db } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    try {
        const {uEmail} = await req.json();
        const university = await db.university.findFirst({
            where:{email:uEmail}
        });
        if(!university){
            return NextResponse.json({message:`No such university found with email ${uEmail}` , statusCode: 400 } );
        }
        const posts = await db.post.findMany({
            where:{university_id:university.id}
        })
        return NextResponse.json({message:'Found all the posts !',data:posts,statusCode:200});
    }catch(err){
        return NextResponse.json({error:err,statusCode:404});
    }
}