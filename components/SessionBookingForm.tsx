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


type Props = {
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

const SessionBookingForm = (props:Props) =>  {
  const searchParams = useSearchParams();
  // console.log("searchparams are: ",searchParams);
  const [date, setDate] = React.useState<Date>()
  const [duration,setduration] = React.useState<number | null>(null);
  const [slot,setSlot] = React.useState<String | null> (null);  
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
                    id:props.id,
                    duration:hrduration,
                    amount: hrduration*700,
                    start_time:slots?slots[0]:'21',
                    end_time:slots?slots[1]:'23',
                    date: date?.toDateString(),
                    mentorEmail: props.email
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
    setduration(value);
    console.log(`selected ${value}`);
  };

  const onChange2 = (value: string) => {
    setSlot(value);
    console.log(`selected ${value}`);
  }

  const onChange3 = (value:any) => {
    console.log(value);
    setDate(value);
    // data.filter(aad ki date == d.date)
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

                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight m-4">Pick a time</h4>
                          {/* date : [ {2,"12:30-14"},{1,"12-13"},{4,"14-18"}] */}
                          <Select
                              showSearch
                              placeholder="Select duration"
                              optionFilterProp="children"
                              onChange={onChange}
                              // onSearch={onSearch}
                              // filterOption={filterOption}
                              options={[
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
                              ]}
                              style={{width:180,margin:'10px'}}
                            />
                          
                        <Select
                              showSearch
                              placeholder="Pick a Slot  "
                              optionFilterProp="children"
                              onChange={onChange2}
                              // onSearch={onSearch}
                              // filterOption={filterOption}
                              options={[
                                {
                                  value: '9-11',
                                  label: '9-11 IST',
                                },
                                {
                                  value: '12-14',
                                  label: '12-14 IST',
                                },
                                {
                                  value: '15-17',
                                  label: '15-17 IST',
                                },
                                {
                                  value: '18-20',
                                  label: '18-20 IST',
                                },
                                {
                                  value:'21-23',
                                  label:'21-23 IST'                                  
                                }
                              ]}
                              style={{width:180}}
                            />
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