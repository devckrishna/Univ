import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key, {
  apiVersion: "2023-10-16",
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);
  const duration = (body[0]["duration"]).toString();
  const amount = (body[0]["amount"]).toString();
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
          };
        }),
        phone_number_collection: {
          enabled: false,
        },

        success_url: `univ-mcxr9dwii-chirag77302.vercel.app/mentor/${body[0]["id"]}/bookSession?success=true&date=${body[0]["date"]}&start_time=${body[0]["start_time"]}&end_time=${body[0]["end_time"]}&hrduration=${body[0]["duration"]}&amount=${body[0]["amount"]}`,
        cancel_url: `univ-mcxr9dwii-chirag77302.vercel.app/mentor/3cedcfd1-4bd7-49b5-964a-8f7c8171e64b/bookSession`,
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