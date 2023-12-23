import { db } from "@/utils/db";
import Razorpay from 'razorpay';
import {v4 as uuidv4 } from 'uuid';
import crypto from "crypto";
import { NextResponse, NextRequest } from "next/server";

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY as string,
    key_secret: process.env.RAZORPAY_API_SECRET as string,
  });

export async function POST(req: NextRequest) {

    const {amount,currency,slot,date,payeeName,payeeEmail,id} = await req.json();

    const payment_capture = 1;
    // const amount = 1 * 100 // amount in paisa. In our case it's INR 1
    // const currency = "INR";
    const options = {
        amount: amount*100,
        currency,
        receipt: uuidv4() as string,
        payment_capture,
        notes: {
            // These notes will be added to your transaction. So you can search it within their dashboard.
            // Also, it's included in webhooks as well. So you can automate it.
            slot:slot,
            date: date,
            MenteeName: payeeName,
            MenteeEmail: payeeEmail,
            MenteeId: id
        }
    };

   const order = await instance.orders.create(options);
   return NextResponse.json({ msg: "success",order });
}

// export async function POST(req: NextRequest) {
//     // try {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
//         const body = razorpay_order_id + "|" + razorpay_payment_id;
//         console.log("id==",body)
//         const expectedSignature = crypto
//             .createHmac("sha256", process.env.RAZORPAY_API_SECRET as string)
//             .update(body.toString())
//             .digest("hex");
//         const isAuthentic = expectedSignature === razorpay_signature;

//         if(isAuthentic){
//             // new payment schema 
            
//             // instance.transfers.create({
//             //     account: 'account_id', // Bank account ID
//             //     amount: 100, // Amount in paise
//             //     currency: 'INR',
//             //     method: 'NEFT', // Transfer method
//             //     notes: {
//             //       'reason': 'Transfer for XYZ purpose',
//             //     },
//             //   }, function(err, transfer) {
//             //     console.log(transfer);
//             //   });


//         }
//         return NextResponse.json({message:'Payment received successfully !'})
//     }

    //   try {
//     const mentorId = params.id;
//     const {
//       name,
//       email,
//       password,
//       description,
//       country,
//       university,
//       image,
//       gender,
//       rating,
//     } = await req.json();
//     const updatedMentor = await db.mentor.update({
//       where: { id: mentorId },
//       data: {
//         name,
//         email,
//         password,
//         description,
//         country,
//         university,
//         image,
//         gender,
//         rating,
//       },
//     });
//     return NextResponse.json({
//       message: "mentor updated",
//       data: updatedMentor,
//     });
//   } catch (err) {
//     return NextResponse.json({
//       message: "Error updating mentor {PUT: api/mentor/id}",
//     });
//   }
// }
