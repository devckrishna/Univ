'use client';
import React, { useEffect, useState } from "react";
import {Row,Col,Space,Descriptions,Image, Divider} from 'antd';
import { RotateLeftOutlined,
    RotateRightOutlined,
    SwapOutlined,
    ZoomInOutlined,
    ZoomOutOutlined } from '@ant-design/icons';
import Link from "next/link";
import Feedbacks from "@/components/Feedbacks";
import axios from "axios";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import MenteeBookings from "@/components/MenteeBooking";

type MenteeObj = {
    id: string;
    country: string;
    description: string;
    email: string;
    gender: string;
    image: string;
    name: string;
};


type BookingInterface = {
  id:string,
  date:string,
  start_time:string,
  end_time:string,
  duration:Number,
  student_id:string,
  mentor_id:string,
  amount:Number
}


const StudentProfile = ({ params }: { params: { id: string } }) =>{
    const [isLoading, setIsLoading] = useState(true);
    const [bookings,setBookings] = useState<BookingInterface[]>([]);
    const [menteeDetails, setMenteeDetails]  = React.useState<MenteeObj>({
      id: "",
      country: "",
      description: "",
      email: "",
      gender: "",
      image: "",
      name: ""
    });

    const getdetails = async() => {
      console.log("hehehhe");
      const data = await axios.get("/api/student/"+params.id);
      console.log(data.data);
      setMenteeDetails(data.data);
      console.log("mentee details ",menteeDetails);
      setIsLoading(false);
    }

    const getBookings = async() => {
      const data = await axios.post("/api/student/getBookings",{
        email:menteeDetails.email
      });
      setBookings(data.data.data);
    }
      
    useEffect(()=>{
      getdetails();
      getBookings();
      console.log("current mentor details are",menteeDetails);
      console.log("upcoming sessions are ",bookings);
    },[])

    if(isLoading){
      return (<Loading />);
    }else{
    return (
        <>
            <Navbar profile={`/mentee/${menteeDetails.id}`}/>
            <div
              style={{
                background: '#F5F7FA',
              }}
            >
            <div className="p-8">
                  <Row gutter={[48,48]}>
                    
                      <Col xs={{span:24}} lg={{span:10}}>
                        <div style={{backgroundColor:'white',padding:"20px",height:'inherit'}}>
                            <Image 
                            src={menteeDetails.image}
                            preview={{
                                toolbarRender: (
                                  _,
                                  {
                                    transform: { scale },
                                    actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
                                  },
                                ) => (
                                  <Space size={12} className="toolbar-wrapper">
                                    <SwapOutlined rotate={90} onClick={onFlipY} />
                                    <SwapOutlined onClick={onFlipX} />
                                    <RotateLeftOutlined onClick={onRotateLeft} />
                                    <RotateRightOutlined onClick={onRotateRight} />
                                    <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                                    <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                                  </Space>
                                ),
                              }}
                            />
                            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-4 text-center">{menteeDetails.name}</h2>
                            <p className="text-center">{menteeDetails.description}</p>
                            <Divider style={{margin:'15px'}}>
                              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Personal Information</h3>
                            </Divider>
                            <Descriptions bordered items={[
                                                  {
                                                    key: '1',
                                                    label: 'Email',
                                                    children: menteeDetails.email,
                                                    span:3
                                                  },
                                                  {
                                                    key: '2',
                                                    label: 'Country',
                                                    children: menteeDetails.country,
                                                    span:3
                                                  },
                                                  {
                                                    key: '3',
                                                    label: 'gender',
                                                    children: menteeDetails.gender,
                                                    span:3
                                                  }
                                                ]} />
                            <Divider style={{margin:'15px'}}>
                              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Edit Info</h3>
                            </Divider>
                            <div className="flex flex-col space-y-3">
                                <Link href='/'>
                                  <Button className="w-full">Edit Personal Information</Button>
                                </Link>
                                <Link href='/mentee/bookSession'>
                                  <Button className="w-full">Book A MentorShip Session</Button>
                                </Link>
                            </div>
                        </div>
                      </Col>

                      <Col xs={{span:24}} lg={{span:14}}>

                          <Row gutter={[16,16]}>
                            <Col span={24}>
                              <Divider style={{margin:'15px'}}>
                                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Upcoming Sessions</h3>
                              </Divider>
                              {bookings.length == 0 && <div id="alert-additional-content-1" className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                                            <div className="flex items-center">
                                              <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                              </svg>
                                              <span className="sr-only">Info</span>
                                              <h3 className="text-lg font-medium">No Upcoming Sessions</h3>
                                            </div>
                                            <div className="mt-2 mb-4 text-sm">
                                              Hey there ! 
                                              You don't have any upcoming sessions as of now ! Visit the Bookings page to book more sessions.  
                                            </div>
                                            <div className="flex">
                                              <Link href={`/mentee/bookSession`}>
                                                <button type="button" className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                  <svg className="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                                    <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                                                  </svg>
                                                  Book a mentorship Session
                                                </button>
                                              </Link>
                                            </div>
                                          </div>}
                                          <MenteeBookings bookings={bookings}/>
                              {/* <Bookings mentorDetails={{}} bookings={[]}/> */}
                            </Col>
                          </Row>

                          <Row gutter={[16,16]}>
                            <Col span={24}>
                                <Divider style={{margin:'15px'}}>
                                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Mentor Feedbacks</h3>
                                </Divider>
                                <Feedbacks />
                            </Col>
                          </Row>

                      </Col>
                  </Row>

            </div>
            </div>


        </>
    );
  }
}

export default StudentProfile;