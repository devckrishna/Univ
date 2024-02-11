'use client'
import * as React from 'react';
import Typography from '@mui/joy/Typography';
import { Select } from 'antd';
import { useAppSelector } from '@/redux/hooks';
import { Calendar } from "@/components/ui/calendar"
import { redirect, useSearchParams } from 'next/navigation';
import getStipePromise from '@/lib/stripe';
import { Button } from './ui/button';
import { useUser } from '@clerk/nextjs';
import { CardHeader,Card,CardDescription,CardContent } from './ui/card';
import { db } from '@/utils/db';
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

const SessionBookingForm: React.FC<Props> = ({mentorDetails,slots}) =>  {
  const searchParams = useSearchParams();
  // console.log("searchparams are: ",searchParams);
  const [date, setDate] = React.useState<Date>();
  const [loading,setLoading] = React.useState<Boolean>(false);
  const [duration,setduration] = React.useState<number | null>(null);
  const [slot,setSlot] = React.useState<String | null> (null);  
  const [doptions,setDoptions] = React.useState<DurationInterface[]>([
                                                                    {
                                                                      value: 30,
                                                                      label: '30 mins',
                                                                    },
                                                                    {
                                                                      value: 60,
                                                                      label: '60 mins',
                                                                    },
                                                                    {
                                                                      value: 90,
                                                                      label: '90 mins',
                                                                    },
                                                                    {
                                                                      value: 120,
                                                                      label: '120 mins',
                                                                    }
                                                                  ]);
  const [soptions,setSoptions] = React.useState<SlotOptionInterface[][]>([[],[],[],[]]);
  const user = useUser();

  const makePayment = async() => {
    
    console.log(duration)
    console.log(slot);
    console.log(date?.toDateString());
    const slots = slot?.split('-');
    // console.log(currstate);
    let hrduration = 0;
    if(duration)hrduration = duration/60;
    
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
                    amount: hrduration*700,
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
    console.log(data);
    if (data.session) {
      stripe?.redirectToCheckout({ sessionId: data.session.id });
    }

  }

  const onChange = (value: number) => {
    setLoading(true);
    setduration(value);
    setLoading(false);
    console.log(`selected ${value}`);
  };

  const onChange2 = (value: string) => {
    setSlot(value);
    console.log(`selected ${value}`);
  }

  const onChange3 = (value:any) => {
    console.log(value);
    setDate(value);
    
    setLoading(true);

    const filteredslots = slots.filter((s)=>(new Date(s.date) == value));
    let slotsbydate:SlotOptionInterface[][] = [[],[],[],[]];
    let a = false,b = false,c = false,d = false;
    for(let i=0;i<filteredslots.length;i++){
      let x = `${filteredslots[i].start_time}-${filteredslots[i].end_time}`;
      let y = `${filteredslots[i].start_time}-${filteredslots[i].end_time} IST`;
      if(filteredslots[i].duration == 30){
        a = true;
        slotsbydate[0].push({
          value:x,
          label:y
        })
      }
      else if(filteredslots[i].duration == 60){
        b = true;
        slotsbydate[1].push({
          value:x,
          label:y
        })
      }
      else if(filteredslots[i].duration == 90){
        c = true;
        slotsbydate[2].push({
          value:x,
          label:y
        })
      }
      else if(filteredslots[i].duration == 120){
        d = true;
        slotsbydate[3].push({
          value:x,
          label:y
        })
      }
    }

    let newduration:DurationInterface[] = [];
    if(a)newduration.push({value:30,label:'30 mins'});
    if(b)newduration.push({value:60,label:'60 mins'});
    if(c)newduration.push({value:90,label:'90 mins'});
    if(d)newduration.push({value:120,label:'120 mins'});

    setDoptions(newduration);
    setSoptions(slotsbydate);
    setduration(null);
    setSlot(null);

    setLoading(false);

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
                  {loading == true && <Loading />}
                  {loading == false && doptions.length>0 && <Select
                                          showSearch
                                          placeholder="Select duration"
                                          optionFilterProp="children"
                                          onChange={onChange}
                                          options={doptions}
                                          style={{width:180,margin:'10px'}}
                                        />}   
                  {loading == false && doptions.length>0 && <Select
                                          showSearch
                                          placeholder="Pick a Slot  "
                                          optionFilterProp="children"
                                          onChange={onChange2}
                                          options={duration?soptions[duration/30 - 1]:[]}
                                          style={{width:180}}
                                        />}
                  {doptions.length>0 && <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 wfull ring-inset ring-blue-700/10">Sorry ! No Slots available for the mentioned date</span>}
                </CardContent>
                
                <CardContent className='flex flex-col items-center text-center'>
                    <Button
                    disabled={slot==null || duration==null || date==undefined} 
                    onClick={() => makePayment()}
                    >Pay now !</Button>
                        
                        <Card className='mt-2 w-full'>
                          <CardContent className='flex flex-row pt-4 p-4'>
                              <div className='w-4/5 flex items-center justify-start'>
                                  <Typography><strong>This is a rare find.</strong> Josephine's time<br></br>
                                  on Uni-Connect is usually booked.</Typography>
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