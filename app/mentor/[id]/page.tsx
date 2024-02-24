'use client'
import {useEffect, useState} from "react";
import {Row,Col,Space,Descriptions, Image, Divider} from 'antd';
import { RotateLeftOutlined,RotateRightOutlined,SwapOutlined,ZoomInOutlined,ZoomOutOutlined } from '@ant-design/icons';
import Bookings from "@/components/Bookings";
import Feedbacks from "@/components/Feedbacks";
import Loading from "@/components/Loading";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { AlertDialog,AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationProps } from "antd";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

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


type BookingInterface = {
  id:string,
  date:string,
  start_time:string,
  end_time:string,
  duration:Number,
  student_id:string,
  mentor_id:string,
  amount:Number,
  mentorFeedbackFlag:Boolean,
  menteeFeedbackFlag:Boolean,
  mentorFeedback: string,
  menteeFeedback: string,
  menteeFeedbackRating: Number
}

const MentorProfile = ({ params }: { params: { id: string } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookings,setBookings] = useState<BookingInterface[]>([]);
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
  const [cbookings,setCbookings] = useState<BookingInterface[]>([]);
  const [page,setPage] = useState(1);
  const router = useRouter();
  
  const getdetails = async() => {
    console.log("hehehhe");
    const data = await axios.get("/api/mentor/"+params.id);
    console.log(data.data.data);
    setMentorDetails(data.data.data);
    console.log("mentor details ",mentorDetails);
    setIsLoading(false);
  }
  
  const getBookings = async() => {
    const data = await axios.post("/api/mentor/getBookings",{
      email:mentorDetails.email
    });
    setBookings(data.data.data);
  }

  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    // console.log("current page is",pageNumber)
    setPage(pageNumber);
    console.log("current updated page is",pageNumber)
    if((page-1)*5 + 5<=bookings.length)setCbookings(bookings.slice((page-1)*5,5));
    else setCbookings(bookings.slice((page-1)*5));
  };

  const submitFeedback = async () => {

    const res = await axios.post("/api/mentor/Feedback",{
      method:"PUT",
      body:JSON.stringify({
        bookingId: '',
        feedbackText:''
      })
    });

    // const data = await res.json();
    

  }

  useEffect(()=>{
    getdetails();
    getBookings();
    console.log("current mentor details are",mentorDetails);
    setPage(1);
    if(bookings.length<=5)setCbookings(bookings);
    else setCbookings(bookings.slice((page-1)*5,5));
    console.log(bookings);
  },[])

        if(isLoading){
          return (<Loading />)
        }else{
        return (
            <>
                <Navbar profile={`/mentor/${mentorDetails.id}`}/>
                
                <div
                    style={{
                      background: '#F5F7FA',
                    }}
                  >
                      <div className="p-8" >
                            <Row gutter={[48,48]}>
                              
                                <Col xs={{span:24}} lg={{span:10}}>
                                  <div style={{backgroundColor:'white',padding:"20px",height:'inherit'}}>
                                  <Image 
                                      src={mentorDetails.image}
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
                                      <h2 className="scroll-m-20 pb-2 text-3xl text-center font-semibold tracking-tight first:mt-4">{mentorDetails.name}</h2>
                                      <p className="text-center">{mentorDetails.description}</p>
                                      <Divider>
                                          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Personal Information</h3>
                                      </Divider>
                                      <Descriptions bordered items={[
                                                  {
                                                    key: '1',
                                                    label: 'Email',
                                                    children: mentorDetails.email,
                                                    span:3
                                                  },
                                                  {
                                                    key: '2',
                                                    label: 'Country',
                                                    children: mentorDetails.country,
                                                    span:3
                                                  },
                                                  {
                                                    key: '3',
                                                    label: 'gender',
                                                    children: mentorDetails.gender,
                                                    span:3
                                                  },
                                                  {
                                                    key: '4',
                                                    label: 'University',
                                                    children: mentorDetails.university,
                                                    span:3
                                                  },
                                                  {
                                                    key: '5',
                                                    label: 'Rate',
                                                    children: `Rs ${mentorDetails.rate}`,
                                                    span: 3,
                                                  }
                                                ]} />
                                      <Divider>
                                          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Edit Info</h3>
                                      </Divider>
                                      <div className="flex flex-col space-y-3">
                                          <Link href='/'>
                                            <Button className="w-full">Edit Personal Information</Button>
                                          </Link>
                                          <Link href={`/mentor/${mentorDetails.id}/updateSlots`}>
                                            <Button className="w-full">Update Mentorship Slots</Button>
                                          </Link>
                                      </div>
                                    
                                  </div>
                                </Col>

                                <Col xs={{span:24}} lg={{span:14}}>
                                    <Row gutter={[16,16]}>
                                      <Col span={24}>
                                            
                                            <div className="bg-white py-10 sm:py-12">
                                              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                                                  <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                                    <dt className="text-base leading-7 text-gray-600">Total Sessions</dt>
                                                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">60</dd>
                                                  </div>
                                                  <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                                    <dt className="text-base leading-7 text-gray-600">Mentor Rating</dt>
                                                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">4/5</dd>
                                                  </div>
                                                  <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                                    <dt className="text-base leading-7 text-gray-600">Mentorship Hours</dt>
                                                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">70</dd>
                                                  </div>
                                                </dl>
                                              </div>
                                            </div>

                                      </Col>
                                    </Row>

                                    <Row gutter={[16,16]}>
                                      <Col span={24}>
                                        <Divider>
                                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Upcoming Sessions</h3>
                                        </Divider>
                                        {bookings.length>0 && 
                                          <>
                                            {/* <Bookings mentorDetails={mentorDetails} bookings={bookings} /> */}
                                            <Table className="bg-white">
                                                  <TableHeader>
                                                    <TableRow>
                                                      <TableHead className="w-[100px] font-extrabold">Date</TableHead>
                                                      <TableHead className="font-extrabold">Start Time</TableHead>
                                                      <TableHead className="font-extrabold">End Time</TableHead>
                                                      <TableHead className="text-right font-extrabold">Duration</TableHead>
                                                      <TableHead className="text-center font-extrabold">Join Link</TableHead>
                                                      <TableHead className="text-center font-extrabold">Fill Feedback</TableHead>
                                                    </TableRow>
                                                  </TableHeader>
                                                  <TableBody>
                                                    {bookings.map((b) => (
                                                      <TableRow key={b.id}>
                                                        <TableCell className="font-medium">{b.date}</TableCell>
                                                        <TableCell>{b.start_time}</TableCell>
                                                        <TableCell>{b.end_time}</TableCell>
                                                        <TableCell className="text-right">{b.duration.toString()}</TableCell>
                                                        <TableCell className="text-center"><Button key={b.id} onClick={()=>router.push("/videocall/"+ `${b.mentor_id}` + "@" + `${b.student_id}` + `?ismentor=true`)}>Join Meet</Button></TableCell>
                                                        <TableCell className="text-center">
                                                          { !b.mentorFeedbackFlag &&  

                                                            <AlertDialog>
                                                              <AlertDialogTrigger asChild>
                                                                <Button key={"694838632uihfewukgugdewkg"}>Feedback</Button>
                                                              </AlertDialogTrigger>
                                                              <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                  <AlertDialogTitle>Provide Feedback for Student !</AlertDialogTitle>
                                                                    <div className="flex flex-col">
                                                                                <Label htmlFor="Feedback" className="text-left mt-3 mb-2">
                                                                                  Feedback
                                                                                </Label>
                                                                                <div className="flex flex-col w-full">
                                                                                    <Textarea placeholder="Type your message here." className="w-full mb-2" />
                                                                                </div>
                                                                    </div>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                  <AlertDialogAction onClick={()=>{
                                                                    submitFeedback();
                                                                    console.log("heyllloooo feed")
                                                                    }}>
                                                                      Submit Feedback
                                                                  </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                              </AlertDialogContent>
                                                            </AlertDialog>                    
                                                          }
                                                          { b.mentorFeedbackFlag && <Badge>Feedback Provider Already</Badge>}
                                                        </TableCell>
                                                      </TableRow>
                                                    ))}
                                                      <TableRow>
                                                        <TableCell className="font-medium">abcd</TableCell>
                                                        <TableCell>bcde</TableCell>
                                                        <TableCell>fafaea</TableCell>
                                                        <TableCell className="text-right">euiwguewy</TableCell>
                                                        <TableCell className="text-center"><Button onClick={()=>router.push("/videocall/"+ `694838632uihfewukgugdewkg` + "@" + `694838632uihfewukgugdewkg` + `?ismentor=true`)}>Join Meet</Button></TableCell>
                                                        <TableCell className="text-center">
                                                          <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                              <Button key={"694838632uihfewukgugdewkg"}>Feedback</Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                              <AlertDialogHeader>
                                                                <AlertDialogTitle>Provide Feedback for Student !</AlertDialogTitle>
                                                                {/* <AlertDialogDescription> */}
                                                                  <div className="flex flex-col">
                                                                              <Label htmlFor="Feedback" className="text-left mt-3 mb-2">
                                                                                Feedback
                                                                              </Label>
                                                                              <div className="flex flex-col w-full">
                                                                                  <Textarea placeholder="Type your message here." className="w-full mb-2" />
                                                                              </div>
                                                                  </div>
                                                                {/* </AlertDialogDescription> */}
                                                              </AlertDialogHeader>
                                                              <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={()=>{
                                                                    submitFeedback();
                                                                    console.log("heyllloooo feed")
                                                                    }}>
                                                                    Submit Feedback
                                                                </AlertDialogAction>
                                                              </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                          </AlertDialog>
                                                        </TableCell>
                                                      </TableRow>
                                                  </TableBody>

                                                  {bookings.length>5 && <TableFooter>
                                                    <TableRow>
                                                      <TableCell className="text-center bg-white" colSpan={5}>
                                                          <Pagination defaultCurrent={1} current={page} onChange={onChange} pageSize={5} total={50} />
                                                      </TableCell>
                                                    </TableRow>
                                                  </TableFooter>}
                                              </Table>
                                          </>
                                          }
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
                                              You don't have any upcoming sessions as of now ! Try updating your availability to get more sessions in future. 
                                            </div>
                                            <div className="flex">
                                              <Link href={`/mentor/${mentorDetails.id}/updateSlots`}>
                                                <button type="button" className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                  <svg className="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                                    <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                                                  </svg>
                                                  Update Slots
                                                </button>
                                              </Link>
                                            </div>
                                          </div>
                                        }
                                      </Col>
                                    </Row>
                                    
                                    <Row gutter={[16,16]}>
                                      <Col span={24}>
                                          <Divider>
                                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Student Feedbacks</h3>
                                          </Divider>
                                          <Feedbacks />
                                      </Col>
                                    </Row>

                                </Col>
                            </Row>

                      </div>
                </div>
            </>
        )
      }
}

export default MentorProfile;