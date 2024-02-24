"use client"
import React, { useEffect, useState } from "react";
import {Row,Col,Avatar} from "antd";
import { Divider} from "@mui/material";
import {Select} from 'antd';
import Navbar from "@/components/Navbar";
import axios from "axios";
import Loading from "@/components/Loading";
import SlotsTable from "@/components/SlotsTable";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";

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

type SlotInterface = {
  id:       string;
  date:      string;
  mentor_id:  string;
  duration:   Number;
  start_time: string;
  end_time:   string;
};

const SlotUpdatePage = ({ params }: { params: { id: string } }) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true);
  const [slots,setSlots] = useState<SlotInterface[]>([]);
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
  const [date, setDate] = React.useState<Date>();
  const [hr, sethr] = React.useState('2');
  const [duration,setduration] = React.useState<string | null>('9-11');

  const getdetails = async() => {
    const data = await axios.get("/api/mentor/"+params.id);
    console.log(data.data.data);
    setMentorDetails(data.data.data);
    console.log("mentor details ",mentorDetails);
  }

  const getslots = async() => {
    const data = await axios.get("/api/mentor/"+params.id+'/getSlot');
    console.log('2nd route is',data.data.data);
    setSlots(data.data.data);
  }

  const onChange = (value: string) => {
    // setLoading(true);
    sethr(value);
    setduration(null);
    // setLoading(false);
    console.log(`selected ${hr}`);
  };

  const onChange2 = (value: string) => {
    setduration(value);
    console.log(`selected ${value}`);
  }

  const handleSubmit = async () => {
      setIsLoading(true);
      console.log(date?.toDateString());
      const res = await fetch('http://localhost:3000/api/mentor/addAvailability',{
          method:'POST',
          body:JSON.stringify({
              mentor_id:params.id,
              date:date?.toDateString(),
              duration:parseInt(hr),
              start_time:duration?.split("-")[0],
              end_time:duration?.split("-")[1]
          }),
          headers: {
            'Content-Type': 'application/json',
          }
      });
      const data = await res.json();
      console.log(data.data);
      getslots();
      setIsLoading(false);
  }

  const onChange3 = (value:any) => {
    console.log(value);
    setDate(value); 
  }

  const checkOverlap = () => {
    let newslots = slots.filter((s)=>(s.date == date?.toDateString()));
    // for(let i=0;i<slots.length;i++){
    //   // console.log("----",slots[i].date,"-----",date?.toDateString);
    //   if(slots[i].date==date?.toDateString())newslots.push(slots[i]);
    // }
    console.log(newslots);
    let starthr = parseInt(duration?duration.split('-')[0]:'2');
    let endhr = parseInt(duration?duration.split('-')[1]:'3');

    for(let i=0;i<newslots.length;i++){
      let start_time = parseInt(newslots[i].start_time);
      let end_time = parseInt(newslots[i].end_time);
      if( (start_time<=starthr && starthr<=end_time) || (start_time<=endhr && endhr<=end_time) ){
        return true;
      }      
    }
    
    return false;
  }


  const onFinish = () => {
      if(!date || !duration || !hr){
        toast({
          variant: "destructive",
          title: "Unable to update slot !",
          description: "Please fill out all the mandatory fields to update slots !",
        })
        return;
      }
      let result = checkOverlap();
      // console.log(result);
      if(result == false){
        handleSubmit();
      }else{
        toast({
          variant: "destructive",
          title: "Unable to update slot !",
          description: "Clashing timings ! You have already added a slot clashing at the same time.",
        })
      }
  };

  useEffect(() => {
    getdetails();
    getslots();
    setIsLoading(false);
  },[]);

  if(isLoading){
    return (<Loading />)
  }else{
  return (
          <>
            <Navbar profile={`/mentor/${mentorDetails.id}`}/>

              <div
                style={{
                  background: "#F5F7FA",
                }}
              >
                <div className="p-8">
                  <Row gutter={[48, 48]} align="middle" justify="center">
                    <div className="flex flex-col justify-center align-middle">
                        <Avatar
                          className="ml-10"
                          size={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100, xxl: 100 }}
                          alt="Travis Howard"
                          src={mentorDetails.image}
                        />
                        <h3 className="scroll-m-20 text-2xl m-6 font-semibold tracking-tight">{mentorDetails.name}</h3>
                    </div>
                  </Row>

                  <Row>
                    <Col xs={{ span: 0 }} lg={{ span: 8 }}></Col>
                    <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                        <>
                            <Card className='w-9/10 shadow-lg'>
                                <CardContent className='flex flex-col items-center text-center'>
                                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight m-4">Pick a date</h4>
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={onChange3}
                                            className="rounded-md border shadow"
                                          />
                                  
                                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight m-4">Pick a time</h4>
                                  
                                  <Select
                                      showSearch
                                      placeholder="Select duration"
                                      optionFilterProp="children"
                                      onChange={onChange}
                                      value={hr}
                                      options={[
                                        {
                                          value: '1',
                                          label: '60 mins',
                                        },
                                        {
                                          value: '2',
                                          label: '120 mins',
                                        }
                                      ]}
                                      style={{width:180,margin:'10px'}}
                                  />   
                                  <Select
                                        showSearch
                                        placeholder="Pick a Slot  "
                                        optionFilterProp="children"
                                        onChange={onChange2}
                                        options={
                                          hr=='2'?[
                                          {value:'9-11',label:'9-11 IST'},
                                          {value:'12-14',label:'12-14 IST'},
                                          {value:'14-16',label:'14-16 IST'},
                                          {value:'17-19',label:'17-19 IST'},
                                          {value:'20-22',label:'20-22 IST'},
                                          {value:'22-24',label:'22-24 IST'},
                                        ]
                                        :
                                        [
                                          {value:'9-10',label:'9-10 IST'},
                                          {value:'11-12',label:'11-12 IST'},
                                          {value:'12-13',label:'12-13 IST'},
                                          {value:'13-14',label:'13-14 IST'},
                                          {value:'14-15',label:'14-15 IST'},
                                          {value:'16-17',label:'16-17 IST'},
                                          {value:'18-19',label:'18-19 IST'},
                                          {value:'19-20',label:'19-20 IST'},
                                          {value:'20-21',label:'20-21 IST'},
                                          {value:'21-22',label:'21-22 IST'},
                                          {value:'22-23',label:'22-23 IST'},
                                          {value:'23-24',label:'23-24 IST'},
                                        ]
                                      }
                                      value={duration}
                                      style={{width:180}} 
                                      
                                      />
                                  
                                </CardContent>
                                
                                <CardContent className='flex flex-col items-center text-center'>
                                    <Button
                                      onClick={() => {
                                        console.log("clicked")
                                        onFinish();
                                      }}
                                    >Add New Slot !</Button>
                                </CardContent>

                            </Card>
                        </>
                    </Col>
                    <Col xs={{ span: 0 }} lg={{ span: 8 }}></Col>
                  </Row>

                  <Row align="middle" justify="center">
                    <Col xs={{ span: 0 }} lg={{ span: 6 }}></Col>
                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                      <Divider>
                        <h3 className="scroll-m-20 text-2xl my-6 font-semibold tracking-tight">Available Slots</h3>
                      </Divider>
                      {slots.length == 0 && 
                                          <div id="alert-additional-content-1" className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                                            <div className="flex items-center">
                                              <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                              </svg>
                                              <span className="sr-only">Info</span>
                                              <h3 className="text-lg font-medium">No Upcoming Available Slots</h3>
                                            </div>
                                            <div className="mt-2 mb-4 text-sm">
                                              Hey there ! 
                                              You don't have any upcoming open slots as of now ! Try updating your availability to get more sessions in future. 
                                            </div>
                                          </div>
                                        }
                      {slots.length>0 && <SlotsTable slots={slots}/>}
                    </Col>
                    <Col xs={{ span: 0 }} lg={{ span: 6 }}></Col>
                  </Row>
                </div>
              </div>
            </>
    );
  }
};

export default SlotUpdatePage;
