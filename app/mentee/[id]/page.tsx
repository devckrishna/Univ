'use client';
import React, { useEffect, useState } from "react";
import {Row,Col,Space,Descriptions,Image, Divider, Pagination, PaginationProps} from 'antd';
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

import { Table,TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow } from "@/components/ui/table";
import { AlertDialog,AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,SelectContent } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

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
  duration:number,
  student_id:string,
  mentor_id:string,
  amount:Number,
  mentorFeedbackFlag:Boolean,
  menteeFeedbackFlag:Boolean,
  mentorFeedback: string,
  menteeFeedback: string,
  menteeFeedbackRating: number
}


const StudentProfile = ({ params }: { params: { id: string } }) =>{
    const [isLoading, setIsLoading] = useState(true);
    const {user} = useUser();
    const [cbookings,setCbookings] = useState<BookingInterface[]>([]);
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
    const [rating,setRating] = useState('1');
    const [content,setContent] = useState("");
    const {toast} = useToast();
    const router = useRouter();
    const [page,setPage] = useState(1);

    const getdetails = async() => {
      // console.log("hehehhe");
      const data = await axios.get("/api/student/"+params.id);
      console.log(data.data);
      setMenteeDetails(data.data);
      // console.log("mentee details ",menteeDetails);
    }

    const getBookings = async() => {
      const data = await axios.post("/api/student/getBookings",{
        email:menteeDetails.email
      });
      let allslots = data.data.data;
      allslots.sort((a:BookingInterface,b:BookingInterface) => (+new Date(a.date) - +new Date(b.date)) );
      setBookings(data.data.data);

      // set current bookings for mentee
      setPage(1);
      if(data.data.data.length<=5)setCbookings(data.data.data);
      else setCbookings(data.data.data.slice(0,5));
      
      setIsLoading(false);
    }
      
    const submitFeedback = async(bookingId:string) => {
        if(content === "" || !rating){
              toast({
                variant: "destructive",
                title: "Invalid Feedback!",
                description: "Please provide feedback with a valid rating number & non-empty message",
              })
              setRating('1');
              setContent("");
              return;
        }

        setIsLoading(true);
        console.log("booking id is ",bookingId);
        const res = await fetch("/api/student/Feedback",{
          method:"PUT",
          body:JSON.stringify({
            bookingId: bookingId,
            feedbackText:content,
            FeedbackRating:parseInt(rating)
          }),
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log(await res.json());
        setContent("");
        setRating('1');
        await getBookings();
    }

    const onChange: PaginationProps['onChange'] = (pageNumber) => {
      setPage(pageNumber);
      console.log("current updated page is",pageNumber)
      if((pageNumber-1)*5 + 5<=bookings.length)setCbookings(bookings.slice((pageNumber-1)*5,(pageNumber-1)*5+5));
      else setCbookings(bookings.slice((pageNumber-1)*5));
    };

    useEffect(()=>{
      getdetails();
      getBookings();
      console.log("current mentor details are",menteeDetails);
      console.log("upcoming sessions are ",bookings);
      // console.log("email is ",user?.emailAddresses[0].emailAddress);
    },[]);

    if(isLoading){
      return (<Loading />);
    }else{
    return (
        <>
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
                                                    label: 'Gender',
                                                    children: menteeDetails.gender,
                                                    span:3
                                                  }
                                                ]} />
                            <Divider style={{margin:'15px'}}>
                              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Edit Info</h3>
                            </Divider>
                            <div className="flex flex-col space-y-3">
                                
                                <Button className="w-full" onClick={()=>toast({
                                                  title: "Coming soon !",
                                                  description: "Will be added for next version !",
                                          })}>Edit Personal Information</Button>
                                <Link href='/mentee/bookSession'>
                                  <Button className="w-full">Book A Mentorship Session</Button>
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
                              
                              <>
                              <Table className="bg-white">
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead className="font-extrabold">Date</TableHead>
                                          <TableHead className="font-extrabold">Start Time</TableHead>
                                          <TableHead className="font-extrabold">End Time</TableHead>
                                          <TableHead className="text-right font-extrabold">Duration</TableHead>
                                          <TableHead className="text-center font-extrabold">Join Link</TableHead>
                                          <TableHead className="text-center font-extrabold">Fill Feedback</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {cbookings.map((b) => (
                                          <TableRow key={b.id}>
                                            <TableCell className="font-medium">{b.date}</TableCell>
                                            <TableCell className="text-center">{b.start_time}</TableCell>
                                            <TableCell className="text-center">{b.end_time}</TableCell>
                                            <TableCell className="text-center">{b.duration.toString()}</TableCell>
                                            <TableCell className="text-center">
                                              <Button key={b.id} onClick={()=>router.push("/videocall/"+ `${b.mentor_id}` + "@" + `${b.student_id}` + `?ismentor=false`)} 
                                              disabled={+new Date()!=+new Date(b.date) || new Date().getHours()<parseInt(b.start_time) || new Date().getHours()>parseInt(b.end_time) }
                                              >
                                                Join Meet
                                              </Button>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {b.menteeFeedbackFlag && <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Feedback Provider Already !</span>}
                                                {!b.menteeFeedbackFlag && <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                      <Button key={b.id} 
                                                        // disabled={+new Date()<+new Date(b.date) && new Date().getHours()<parseInt(b.end_time) }
                                                        >
                                                        Feedback
                                                      </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                      <AlertDialogHeader>
                                                        <AlertDialogTitle>Provide Feedback for Student !</AlertDialogTitle>
                                                          <div className="flex flex-col">
                                                                    <Label htmlFor="Rating" className="text-left mb-2">
                                                                        Session Rating
                                                                    </Label>
                                                                    <Select onValueChange={(value:string)=>{
                                                                          setRating(value);
                                                                          console.log(rating);
                                                                          }} 
                                                                          value={rating}
                                                                    >
                                                                            <SelectTrigger className="w-[180px]">
                                                                                <SelectValue placeholder="Rate the session" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectGroup>
                                                                                  <SelectLabel>Rating</SelectLabel>
                                                                                    <SelectItem value="1">1</SelectItem>
                                                                                    <SelectItem value="2">2</SelectItem>
                                                                                    <SelectItem value="3">3</SelectItem>
                                                                                    <SelectItem value="4">4</SelectItem>
                                                                                    <SelectItem value="5">5</SelectItem>
                                                                                </SelectGroup>
                                                                            </SelectContent>
                                                                    </Select>
                                                                    <Label htmlFor="Feedback" className="text-left mt-3 mb-2">
                                                                    Feedback
                                                                    </Label>
                                                                    <div className="flex flex-col w-full">
                                                                        <Textarea placeholder="Type your message here." className="w-full mb-2" onChange={(e:any)=>{
                                                                          console.log(e.target.value);
                                                                          setContent(e.target.value);
                                                                        }} value={content} />
                                                                    </div>
                                                          </div>
                                                          </AlertDialogHeader>
                                                      <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={()=>submitFeedback(b.id)}>Submit Feedback</AlertDialogAction>
                                                      </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                              }
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>

                                      {bookings.length>5 && 
                                      <TableFooter>
                                        <TableRow>
                                          <TableCell className="text-center bg-white" colSpan={5}>
                                              <Pagination defaultCurrent={1} current={page} onChange={onChange} pageSize={5} total={bookings.length} />
                                          </TableCell>
                                        </TableRow>
                                      </TableFooter>}
                                </Table>
                              </>
                             
                              {bookings.length == 0 && 
                                      <div id="alert-additional-content-1" className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
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
                                          
                            </Col>
                          </Row>

                          <Row gutter={[16,16]}>
                            <Col span={24}>
                                <Divider style={{margin:'15px'}}>
                                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Mentor Feedbacks</h3>
                                </Divider>
                                <Feedbacks bookings={bookings.filter((b)=>b.mentorFeedbackFlag)} type="Mentor" />
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