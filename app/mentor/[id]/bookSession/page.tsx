"use client";
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Select,
} from "antd";
import {
  PageContainer,
  StatisticCard,
} from "@ant-design/pro-components";
import Bookings from "@/components/Bookings";
import MentorBookingCard from "@/components/MentorBookingCard";
import SessionBookingForm from "@/components/SessionBookingForm";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Loading from "@/components/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/utils/db";
import { Router } from "lucide-react";

// const { Option } = Select;
// const { Statistic } = StatisticCard;
// const settings = ["Go to Profile", "Dashboard", "Logout"];
// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: { span: 24, offset: 0 },
//     sm: { span: 16, offset: 8 },
//   },
// };
type MentorObj = {
  id: string;
  country: string;
  description: string;
  email: string;
  gender: string;
  image: string;
  name: string;
  university: string;
  rating: Number,
  rate: Number
};

// mentor id
const BookSessionPage = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const {user} = useUser();
  const router = useRouter();
  let [hr, sethr] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [bookings,setBookings] = useState<string[]>([]);
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
  const onChange = (date: any, dateString: any) => {
    console.log(date, dateString);
  };

  const handleChange = (value: any) => {
    // console.log("value selected is ",value);
    sethr(value);
  };

  const getdetails = async() => {
    const data = await axios.get("/api/mentor/"+params.id);
    console.log(data.data.data);
    setMentorDetails(data.data.data);
    console.log("mentor details ",mentorDetails);
  }

  const getslots = async() => {
    const data = await axios.post("/api/mentor/getslots",{
      email:mentorDetails.email
    });
    setBookings(data.data);
  }

  const handleSuccessfull = async(email:string,date:string,start_time:string,end_time:string,duration:number,amount:number) => {
    const res = await fetch('/api/addbooking',{
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

    const del = await fetch('api/mentor/addAvailability',{
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

    router.push("/dashboard");
  } 

  useEffect(()=>{
    const email = user?.emailAddresses[0].emailAddress;
    const isSuccessfull = searchParams.get("success");
    const tempDate = searchParams.get("date");
    const start_time = searchParams.get("start_time");
    const end_time = searchParams.get("end_time");
    const hrduration = searchParams.get("duration")??"2";
    const amount = searchParams.get("amount")??"0";
    if (isSuccessfull === "false") {
      toast({
        title: "Fail",
        variant: "destructive",
        description: "Booking Failed, Try Again",
      });
    }
    else if (isSuccessfull !== null && email !== undefined) {
      handleSuccessfull(email, tempDate + "", start_time ?? "", end_time ?? "",parseInt(hrduration),parseInt(amount));
    }
    getdetails();
    getslots();
    setIsLoading(false);
  })

  // console.log(params.id);

  if(isLoading){
    return (<Loading />)
  }else{
    return (
            <>
              <Navbar />
              <div
                style={{
                  background: "#F5F7FA",
                }}
              >
                <PageContainer>
                    <Row> 
                        <Col xs={{ span: 0}} lg={{ span: 2}}></Col>
                        <Col xs={{ span: 24}} lg={{ span: 10}}><MentorBookingCard {...mentorDetails} /></Col>
                        <Col xs={{span:0}} lg={{span:1}}></Col>
                        <Col xs={{ span: 24}} lg={{ span: 8}}><SessionBookingForm {...mentorDetails} /></Col>
                        <Col xs={{ span: 0}} lg={{ span: 2}}></Col>
                    </Row>
                </PageContainer>
              </div>
            </>
          );
        }
};

export default BookSessionPage;
