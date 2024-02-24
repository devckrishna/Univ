'use client'
import * as React from 'react';
import { Select } from 'antd';
import { Calendar } from "@/components/ui/calendar"
import {useSearchParams } from 'next/navigation';
import getStipePromise from '@/lib/stripe';
import { Button } from './ui/button';
import { useUser } from '@clerk/nextjs';
import {Card,CardContent } from './ui/card';
import Loading from './Loading';


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

type SlotInterface = {
  id:string,
  date:string,
  start_time:string,
  end_time:string,
  duration:Number,
  mentor_id:string
}

type Props = {
  mentorDetails:DetailsInterface,
  slots:SlotInterface[]
}

type DurationInterface = {
  value:Number,
  label:String
}

type SlotOptionInterface = {
  value:string, 
  label:string
}

const SessionBookingForm = ({mentorDetails,slots}:Props) =>  {
  const searchParams = useSearchParams();
  // console.log("searchparams are: ",searchParams);
  const [date, setDate] = React.useState<Date>();
  const [loading2,setLoading2] = React.useState<Boolean>(false);
  const [duration,setduration] = React.useState<number | null>(null);
  const [slot,setSlot] = React.useState<String | null> (null);  
  const [doptions,setDoptions] = React.useState<DurationInterface[]>([
                                                                    {
                                                                      value: 1,
                                                                      label: '60 mins',
                                                                    },
                                                                    {
                                                                      value: 2,
                                                                      label: '120 mins',
                                                                    }
                                                                  ]);
  const [soptions,setSoptions] = React.useState<SlotOptionInterface[][]>([[],[]]);
  const user = useUser();

  const makePayment = async() => {
    
    console.log(duration)
    console.log(slot);
    console.log(date?.toDateString());
    const slots = slot?.split('-');
    
    const stripe = await getStipePromise();

    const response = await fetch("http://localhost:3000/api/payment",{
                  method:'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body:JSON.stringify([{
                    name:'session',
                    id:mentorDetails.id,
                    duration:duration,
                    amount: (duration?duration:1)*700,
                    start_time:slots?slots[0]:'21',
                    end_time:slots?slots[1]:'23',
                    date: date?.toDateString(),
                    mentorEmail: mentorDetails.email
                    // payeeName: currstate.auth.credentials?.username,
                    // payeeEmail: currstate.auth.credentials?.email,
                    // payeeId: currstate.auth.credentials?.id
                  }])
        });
    const data = await response.json();
    console.log('frontend payment route response is : ',data);
    if (data.session) {
      stripe?.redirectToCheckout({ sessionId: data.session.id });
    }

  }

  const onChange = (value: number) => {
    setLoading2(true);
    setduration(value);
    setLoading2(false);
    console.log(`selected ${value}`);
  };

  const onChange2 = (value: string) => {
    setSlot(value);
    console.log(`selected ${value}`);
  }

  const onChange3 = (value:any) => {
    
    let newduration:DurationInterface[] = [];
    let slotsbydate:SlotOptionInterface[][] = [[],[]];
    if(!value){
      setDate(value);
      setDoptions(newduration);
      setSoptions(slotsbydate);
      return;
    }

    console.log('current date selected is ',value);
    setDate(value);
    setLoading2(true);
    const filteredslots = slots.filter((s)=>(s.date == value.toDateString()));
    let a = false,b = false;
    console.log("filtered slots are : ",filteredslots);
    
    for(let i=0;i<filteredslots.length;i++){
      let x = `${filteredslots[i].start_time}-${filteredslots[i].end_time}`;
      let y = `${filteredslots[i].start_time}-${filteredslots[i].end_time} IST`;
      if(filteredslots[i].duration == 1){
        a = true;
        slotsbydate[0].push({
          value:x,
          label:y
        })
      }
      else if(filteredslots[i].duration == 2){
        b = true;
        slotsbydate[1].push({
          value:x,
          label:y
        })
      }
    }

    if(a)newduration.push({value:1,label:'60 mins'});
    if(b)newduration.push({value:2,label:'120 mins'});

    console.log("finally selected slots are : ",slotsbydate);
    console.log("finally available durations are : ",newduration);

    setDoptions(newduration);
    setSoptions(slotsbydate);
    setduration(null);
    setSlot(null);

    setLoading2(false);

    console.log(date);
  }

  // 30 mins 12 -12:30
//   backend 
// ḍatabase

// 120 12-14
// set <start_time>


    return (
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
                  {/* date : [ {2,"12:30-14"},{1,"12-13"},{4,"14-18"}] */}
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight m-4">Pick a time</h4>
                  {loading2 == true && <Loading />}
                  {loading2 == false && doptions.length>0 && <Select
                                          showSearch
                                          placeholder="Select duration"
                                          optionFilterProp="children"
                                          onChange={onChange}
                                          options={doptions}
                                          style={{width:180,margin:'10px'}}
                                        />}   
                  {loading2 == false && doptions.length>0 && <Select
                                          showSearch
                                          placeholder="Pick a Slot  "
                                          optionFilterProp="children"
                                          onChange={onChange2}
                                          options={duration?soptions[duration-1]:[]}
                                          style={{width:180}}
                                        />}
                  {doptions.length==0 && <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 wfull ring-inset ring-blue-700/10">Sorry ! No Slots available for the mentioned date</span>}
                </CardContent>
                
                <CardContent className='flex flex-col items-center text-center'>
                    <Button
                    disabled={slot==null || duration==null || date==undefined} 
                    onClick={() => makePayment()}
                    >Pay now !</Button>
                        
                        <Card className='mt-2 w-full'>
                          <CardContent className='flex flex-row pt-4 p-4'>
                              <div className='w-4/5 flex items-center justify-start'>
                                  <p><strong>This is a rare find.</strong> Josephine's time<br></br>
                                  on Uni-Connect is usually booked.</p>
                              </div>
                              <div className='w-1/5 flex items-center justify-end'>
                                  <img src="https://topmate.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ficon-service-diamond.79e0878f.svg&w=48&q=75"/>
                              </div>
                          </CardContent>
                        </Card>

                </CardContent>

            </Card>
        </>
    )
}

export default SessionBookingForm;