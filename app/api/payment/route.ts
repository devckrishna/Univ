import { db } from "@/utils/db";
// import Razorpay from 'razorpay';
// import {v4 as uuidv4 } from 'uuid';
// import crypto from "crypto";
import Stripe from 'stripe';
import { NextResponse, NextRequest } from "next/server";

const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {

    const body = await req.json();
    try {
        if (body.length > 0) {
          const session = await stripe.checkout.sessions.create({
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [],
            invoice_creation: {
              enabled: true,
            },
            line_items: body.map((item: any) => {
              return {
                price_data: {
                  currency: "inr",
                  product_data: {
                    name: item.name,
                  },
                  unit_amount: item.amount * 100,
                },
                quantity: 1,
                adjustable_quantity: {
                  enabled: false,
                  minimum: 1,
                  maximum: 10,
                },
              };
            }),
            phone_number_collection: {
              enabled: false,
            },
            metadata:{
              'duration':body[0]['duration'],
              'mentorEmail':body[0]['mentorEmail'],
              'start_time':body[0]['start_time'],
              'end_time':body[0]['end_time'],
              'session_date':body[0]['date'],
              'amount':body[0]['amount']
            },
            success_url: `http://localhost:3000/mentor/${body[0]['id']}/bookSession?success=true&date=${body[0]["date"]}&start_time=${body[0]["start_time"]}&end_time=${body[0]["end_time"]}&duration=${body[0]["duration"]}&amount=${body[0]["amount"]}`,
            cancel_url: `http://localhost:3000/mentor/${body[0]['id']}/bookSession?success=false`,
          });
          return NextResponse.json({ session });
        } else {
          return NextResponse.json({ message: "No Data Found" });
        }
      } catch (err: any) {
        console.log(err);
        return NextResponse.json(err.message);
      }
   
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
