'use client'
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
import { Button } from "./ui/button"
import { useEffect, useState } from "react";
import { Pagination, PaginationProps } from "antd";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label"
import { Textarea } from "./ui/textarea";
import { AlertDialog,AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger, } from "./ui/alert-dialog";
import { Badge } from "./ui/badge";

type DetailsInterface = {
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

type Props = {
  mentorDetails:DetailsInterface,
  bookings:BookingInterface[]
}

export default function TableDemo({mentorDetails,bookings}:Props) {
  const [cbookings,setCbookings] = useState<BookingInterface[]>([]);
  const [page,setPage] = useState(1);
  const router = useRouter();

  useEffect(()=>{
    setPage(1);
    if(bookings.length<=5){
      setCbookings(bookings);
    }else{
      setCbookings(bookings.slice((page-1)*5,5));
    }
    console.log(bookings);
  },[]);

  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    // console.log("current page is",pageNumber)
    setPage(pageNumber);
    console.log("current updated page is",pageNumber)
    if((page-1)*5 + 5<=bookings.length)setCbookings(bookings.slice((page-1)*5,5));
    else setCbookings(bookings.slice((page-1)*5));
  };


  return (
    <>
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
                          <AlertDialogAction onClick={()=>console.log("heyllloooo feed")}>
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
                        <AlertDialogAction onClick={()=>console.log("heyllloooo feed")}>
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
  )
}


