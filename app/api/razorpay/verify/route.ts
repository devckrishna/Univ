import Razorpay from 'razorpay';
// import {v4 as uuidv4 } from 'uuid';
import crypto from "crypto";
import { NextResponse, NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    // try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        console.log("id==",body)
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET as string)
            .update(body.toString())
            .digest("hex");
        const isAuthentic = expectedSignature === razorpay_signature;

        if(isAuthentic){
            // new payment schema 
            
            // instance.transfers.create({
            //     account: 'account_id', // Bank account ID
            //     amount: 100, // Amount in paise
            //     currency: 'INR',
            //     method: 'NEFT', // Transfer method
            //     notes: {
            //       'reason': 'Transfer for XYZ purpose',
            //     },
            //   }, function(err, transfer) {
            //     console.log(transfer);
            //   });


        }
        return NextResponse.json({message:'Payment received successfully !'})
    }
