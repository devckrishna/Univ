'use client'
import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import { CardHeader,Card,CardDescription,CardContent } from './ui/card';
import Feedback from './Feedback';

const data = [
  {
    id:1,
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    stars: 4,
    description: 'Session went really well. Got all my doubts cleared and she traced out all the mistakes in resume and gave the best practices to improvise my resume . Definitely recommended .',
  },
  {
    id:2,
    src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
    title: 'Lake view',
    stars: 4,
    description: 'Session went really well. Got all my doubts cleared and she traced out all the mistakes in resume and gave the best practices to improvise my resume . Definitely recommended .',
  },
  {
    id:3,
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    stars: 4,
    description: 'Session went really well. Got all my doubts cleared and she traced out all the mistakes in resume and gave the best practices to improvise my resume . Definitely recommended .',
  },
  {
    id:4,
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    stars: 4,
    description: 'Session went really well. Got all my doubts cleared and she traced out all the mistakes in resume and gave the best practices to improvise my resume . Definitely recommended .',
  },
  {
    id:5,
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    stars: 4,
    description: 'Session went really well. Got all my doubts cleared and she traced out all the mistakes in resume and gave the best practices to improvise my resume . Definitely recommended .',
  },
  {
    id:6,
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    stars: 4,
    description: 'Session went really well. Got all my doubts cleared and she traced out all the mistakes in resume and gave the best practices to improvise my resume . Definitely recommended .',
  }
];


type Props = {
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

const MentorBookingCard = (props:Props) =>  {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
        <>
            <Card className='w-9/10 shadow-lg'>
                {/* <CardOverflow variant="solid" sx={{ alignItems: 'center', textAlign: 'center', paddingTop:'6px', paddingBottom:'6px', backgroundColor:'background-color:rgba(48, 88, 137, 0.2)' }}> */}
                <div className='flex flex-col items-center bg-blue-400 p-3'>
                    {/* <Avatar src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg" sx={{ '--Avatar-size': '6rem' }} /> */}
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={props.image} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Chip
                        size="sm"
                        variant="soft"
                        color="primary"
                        sx={{
                            mt: -1,
                            mb: 1,
                            border: '3px solid',
                            borderColor: 'background.surface',
                        }}
                      >
                      {props.rating.toString()} / 5
                    </Chip>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{props.name}</h4>
                {/* </CardOverflow> */}
                </div>

                
                    <CardHeader className='flex flex-row px-0 py-2'>
                        <div className='w-2/5 flex justify-items-center items-center p-0 m-0'>
                          <div className='pl-10'>
                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Hourly Rate : Rs {props.rate.toString()}</span>
                          </div>
                        </div>
                        <Divider orientation="vertical" />
                        <div className='w-3/5 flex items-center justify-items-center'>
                          <div style={{paddingLeft:'80px'}}>
                            <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">{props.university}</h4>
                          </div>
                        </div>
                    </CardHeader>
                {/* </CardOverflow> */}
                
                <CardContent className='text-center'>
                    <p className="leading-5 [&:not(:first-child)]:mt-6">
                        Ex veniam veniam aliqua consectetur. Excepteur nisi reprehenderit ipsum nostrud. Amet ullamco commodo Lorem fugiat occaecat eiusmod sint. Reprehenderit velit anim culpa occaecat consequat consectetur ullamco incididunt consectetur ipsum et occaecat commodo pariatur. Ut nisi duis cupidatat sunt et pariatur laboris aute excepteur dolore officia eiusmod Lorem cupidatat.
                    </p>
                </CardContent>
                <CardContent className='text-center p-4 pt-0'>
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Testimonials</h3>
                </CardContent>

                <div className="flex space-x-4 px-3 pb-6 overflow-x-auto overflow-hidden no-scrollbar">
                  {data.map((item)=>(<Feedback key={item.id} />))}
                </div>


                {/* <div className="flex flex-col bg-white m-auto p-auto">
                <h1 className="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800">Example</h1>
                      <div
                        className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                        <div
                          className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
                            {data.map((item)=><Feedback />)}
                          
                        </div>
                      </div>
                </div> */}

                {/* <CardContent> */}
                    {/* <Box
                        sx={{
                            display: 'flex',
                            // gap: 1,
                            py: 1,
                            overflow: 'auto',
                            width: '100%',
                            // height:400,
                            scrollSnapType: 'x mandatory',
                            '& > *': {
                            scrollSnapAlign: 'center',
                            },
                            '::-webkit-scrollbar': { display: 'none' },
                        }}
                        > */}

                    
                    {/* </Box> */}
                {/* </CardContent> */}
                
                
            </Card>
        </>
    )
}

export default MentorBookingCard;