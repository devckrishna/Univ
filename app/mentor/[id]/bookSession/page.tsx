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

const { Option } = Select;
const { Statistic } = StatisticCard;
const settings = ["Go to Profile", "Dashboard", "Logout"];
const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};
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

const BookSessionPage = ({ params }: { params: { id: string } }) => {
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

  useEffect(()=>{
    // getdetails();
    // getslots();
    setIsLoading(false);
  })

  console.log(params.id);

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
                        <Col xs={{ span: 24}} lg={{ span: 10}}><MentorBookingCard /></Col>
                        <Col xs={{span:0}} lg={{span:1}}></Col>
                        <Col xs={{ span: 24}} lg={{ span: 8}}><SessionBookingForm /></Col>
                        <Col xs={{ span: 0}} lg={{ span: 2}}></Col>
                    </Row>
                </PageContainer>
              </div>
            </>
          );
        }
};

export default BookSessionPage;
