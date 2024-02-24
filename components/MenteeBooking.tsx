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
import { Select, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,SelectContent } from "./ui/select";
import { AlertDialog,AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger, } from "./ui/alert-dialog";
import { useToast } from "./ui/use-toast";

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

type Props = {
  bookings:BookingInterface[]
}

export default function MenteeBookings({bookings}:Props) {
  const [cbookings,setCbookings] = useState<BookingInterface[]>([]);
  const [page,setPage] = useState(1);
  const [rating,setRating] = useState('1');
  const [content,setContent] = useState("");
  const router = useRouter();
  const {toast} = useToast();

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

  const submitFeedback = async() => {
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

  }

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
                <TableCell className="text-center"><Button key={b.id} onClick={()=>router.push("/videocall/"+ `${b.mentor_id}` + "@" + `${b.student_id}` + `?ismentor=false`)}>Join Meet</Button></TableCell>
                <TableCell className="text-center"><Button key={b.id}>Feedback</Button></TableCell>
              </TableRow>
            ))}
              <TableRow>
                <TableCell className="font-medium">abcd</TableCell>
                <TableCell>bcde</TableCell>
                <TableCell>fafaea</TableCell>
                <TableCell className="text-right">euiwguewy</TableCell>
                <TableCell className="text-center"><Button onClick={()=>router.push("/videocall/"+ `694838632uihfewukgugdewkg` + "@" + `694838632uihfewukgugdewkg` + `?ismentor=false`)}>Join Meet</Button></TableCell>
                <TableCell className="text-center">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button key={"694838632uihfewukgugdewkg"}>Feedback</Button>
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
                        <AlertDialogAction onClick={()=>submitFeedback()}>
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

