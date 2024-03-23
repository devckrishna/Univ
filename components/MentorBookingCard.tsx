'use client'
import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CardHeader,Card,CardDescription,CardContent } from './ui/card';
import Feedback from './Feedback';
import { Divider } from 'antd';

type mentorDetails = {
  id: string;
  country: string;
  description: string;
  email: string;
  gender: string;
  image: string;
  name: string;
  university: string;
  rating: number,
  rate: number
};


type Feedback = {
  image:string,
  name:string,
  rating:number,
  description:string
  id:string
}

type Props = {
  mentordetails:mentorDetails,
  feedbacks:Feedback[]
}

const MentorBookingCard = ({mentordetails,feedbacks}:Props) =>  {
   
    return (
        <>
            <Card className='w-9/10 shadow-lg'>
                <div className='flex flex-col items-center bg-blue-400 p-3'>
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={mentordetails.image} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 -mt-2 ml-1 z-50">
                      {mentordetails.rating.toString()} / 5
                    </span>
                    <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">{mentordetails.name}</h4>
                {/* </CardOverflow> */}
                </div>

                
                    <CardHeader className='flex flex-row px-0 py-2'>
                        <div className='w-2/5 flex justify-items-center items-center p-0 m-0'>
                          <div className='pl-10'>
                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Hourly Rate : Rs {mentordetails.rate.toString()}</span>
                          </div>
                        </div>
                        <Divider type='vertical' orientation='center' style={{height:'40px'}}/>
                        <div className='w-3/5 flex items-center justify-items-center'>
                          <div style={{paddingLeft:'80px'}}>
                            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{mentordetails.university}</h4>
                          </div>
                        </div>
                    </CardHeader>
                {/* </CardOverflow> */}
                
                <CardContent className='text-center'>
                    <p className="leading-5 [&:not(:first-child)]:mt-6">
                        Ex veniam veniam aliqua consectetur. Excepteur nisi reprehenderit ipsum nostrud. Amet ullamco commodo Lorem fugiat occaecat eiusmod sint. Reprehenderit velit anim culpa occaecat consequat consectetur ullamco incididunt consectetur ipsum et occaecat commodo pariatur. Ut nisi duis cupidatat sunt et pariatur laboris aute excepteur dolore officia eiusmod Lorem cupidatat.
                    </p>
                </CardContent>
                
                {feedbacks.length>0 && 
                    <>
                      <CardContent className='text-center p-4 pt-0'>
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Testimonials</h3>
                      </CardContent>

                      <div className="flex items-center justify-center space-x-4 px-3 pb-6 overflow-x-auto overflow-hidden no-scrollbar">
                        {feedbacks.map((item)=>(<Feedback key={item.id} feedback={item} />))}
                      </div>
                    </>
                }            
            </Card>
        </>
    )
}

export default MentorBookingCard;