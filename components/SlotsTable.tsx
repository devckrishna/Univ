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
import { useEffect, useState } from "react";
import { Pagination, PaginationProps } from "antd";
import { useRouter } from "next/navigation";


type SlotInterface = {
    id:       string;
    date:      string;
    mentor_id:  string;
    duration:   Number;
    start_time: string;
    end_time:   string;
  };

type Props = {
  slots:SlotInterface[]
}

export default function SlotsTable({slots}:Props) {
  const [cslots,setCslots] = useState<SlotInterface[]>([]);
  const [page,setPage] = useState(1);
  const router = useRouter();

  useEffect(()=>{
    if(slots.length<=5){
        setCslots(slots);
    }else{
        setCslots(slots.slice((page-1)*5,5));
    }
    console.log("slots slice is ",cslots);
    console.log(slots);
  },[]);

  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    // console.log("current page is",pageNumber)
    setPage(pageNumber);
    console.log("current updated page is",pageNumber)
    if((pageNumber-1)*5 + 5<=slots.length){
      console.log('slots slice is ', slots.slice((pageNumber-1)*5, (pageNumber-1)*5 + 5));
      setCslots(slots.slice((pageNumber-1)*5,(pageNumber-1)*5 + 5));
    }else setCslots(slots.slice((pageNumber-1)*5));
  };


  return (
    <>
    <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead className="font-extrabold">Date</TableHead>
              <TableHead className="font-extrabold text-center">Start Time</TableHead>
              <TableHead className="font-extrabold text-center">End Time</TableHead>
              <TableHead className="text-right font-extrabold">Duration(Hr)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cslots.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.date}</TableCell>
                <TableCell className="text-center">{s.start_time}</TableCell>
                <TableCell className="text-center">{s.end_time}</TableCell>
                <TableCell className="text-right">{s.duration.toString()}</TableCell>
              </TableRow>
            ))}
              {/* <TableRow>
                <TableCell className="font-medium">abcd</TableCell>
                <TableCell>bcde</TableCell>
                <TableCell>fafaea</TableCell>
                <TableCell className="text-right">euiwguewy</TableCell>
              </TableRow> */}
          </TableBody>
          {slots.length>5 && 
                    <TableFooter>
                        <TableRow>
                        <TableCell className="text-center bg-white" colSpan={5}>
                            <Pagination defaultCurrent={1} current={page} onChange={onChange} pageSize={5} total={slots.length} />
                        </TableCell>
                        </TableRow>
                    </TableFooter>
            }
      </Table>
    </>
  )
}
