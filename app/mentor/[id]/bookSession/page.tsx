"use client";
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
} from "antd";
import MentorBookingCard from "@/components/MentorBookingCard";
import SessionBookingForm from "@/components/SessionBookingForm";
import axios from "axios";
import Loading from "@/components/Loading";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {useToast } from "@/components/ui/use-toast";

type MentorObj = {
  id: string;
  country: string;
  description: string;
  email: string;
  gender: string;
  image: string;
  name: string;
  university: string;
  rating: number,
  rate: number
};


type booking = {
  id:string,
  date:string,
  start_time:string,
  end_time:string,
  duration:Number,
  mentor_id:string
}

// mentor id
const BookSessionPage = ({ params }: { params: { id: string } }) => {
  const {toast} = useToast();
  const {user} = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [bookings,setBookings] = useState<booking[]>([]);
  const [mentorDetails, setMentorDetails]  = useState<MentorObj>({
    id: "",
    country: "",
    description: "",
    email: "",
    gender: "",
    image: "",
    name: "",
    university: "",
    rating: 0,
    rate:0
  });
 
  const getdetails = async() => {
    // console.log("/api/mentor/"+params.id);
    const data = await axios.get("/api/mentor/"+params.id);
    console.log('mentor details on payment page',data.data.data);
    setMentorDetails(data.data.data);
    console.log("mentor details ",mentorDetails);
  }

  const getslots = async() => {
    // console.log("/api/mentor/"+params.id+"/getSlot");
    const data = await axios.get("/api/mentor/"+params.id+"/getSlot");
    console.log("slots data ",data);
    setBookings(data.data.data);
    setIsLoading(false);
    const isSuccessfull = searchParams.get("success");
    if(isSuccessfull == "true"){
      toast({
        title: "Booking added successfully !",
        description: "Your session has been booked ! Head over to the profile page to see details!",
      })
    }
  }

  const handleSuccessfull = async(email:string,date:string,start_time:string,end_time:string,duration:number,amount:number) => {
    console.log(email,date,start_time,end_time,duration,amount,params.id);
    console.log("we are here at handelsuccessfull");
    const res = await fetch('/api/student/addbooking',{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        student_email: email,
        mentor_id:params.id,
        date:date,
        duration:duration,
        start_time:start_time,
        end_time:end_time,
        amount:amount
      })
    });

    const resp1 = await res.json();
    console.log(resp1);

    const del = await fetch('/api/mentor/addAvailability',{
      method:"DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        date,
        mentor_id:params.id,
        start_time,
        end_time,
        duration
      })
    });

    const response = await del.json();
    console.log(response);

    await getdetails();
    await getslots();

    // router.push("/dashboard");
  } 

  useEffect(()=>{
    // const email = user?.emailAddresses[0].emailAddress;
    const isSuccessfull = searchParams.get("success");
    const tempDate = searchParams.get("date");
    const start_time = searchParams.get("start_time");
    const end_time = searchParams.get("end_time");
    const hrduration = searchParams.get("hrduration");
    const amount = searchParams.get("amount")??"0";
    console.log(isSuccessfull);
    console.log(tempDate);
    console.log(start_time);
    console.log(end_time);
    console.log(hrduration);
    // console.log(email);
    console.log(amount);
    if (isSuccessfull === "false") {
      toast({
        title: "Fail",
        variant: "destructive",
        description: "Booking Failed, Try Again",
      });
    }
    else if (isSuccessfull !== null) {
      console.log("hey we are here");
      // handleSuccessfull(email, tempDate + "", start_time ?? "", end_time ?? "",parseInt(hrduration),parseInt(amount));
    }
    // else {
      getdetails();
      getslots();
      // setIsLoading(false);
    // }
  },[]);

  if(isLoading){
    return (<Loading />)
  }else{
    return (
            <>
              
              <div
                style={{
                  background: "#F5F7FA",
                }}
              >
                <div className="p-12">
                    <Row> 
                        <Col xs={{ span: 0}} lg={{ span: 2}}></Col>
                        <Col xs={{ span: 24}} lg={{ span: 10}}><MentorBookingCard key={mentorDetails.id} {...mentorDetails} /></Col>
                        <Col xs={{span:0}} lg={{span:1}}></Col>
                        <Col xs={{ span: 24}} lg={{ span: 8}}><SessionBookingForm key={mentorDetails.id} mentorDetails={mentorDetails} slots={bookings} /></Col>
                        <Col xs={{ span: 0}} lg={{ span: 2}}></Col>
                    </Row>
                </div>
              </div>
            </>
          );
        }
};

export default BookSessionPage;
