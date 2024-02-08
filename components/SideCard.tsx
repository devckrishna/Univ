'use client'
import React from 'react';
// import { ProCard } from '@ant-design/pro-components';
// import Link from 'next/link';
// import { Button } from 'antd';
import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import img8 from '../public/img8.jpg'
import { redirect, useRouter } from 'next/navigation';
// import { CardHeader } from './ui/card';
// import { Card } from './ui/card';

const Sidecard:  React.FC = () => {

    const router = useRouter();
    const func = () => router.push('/');

    // const backgroundImageUrl = `${process.env.PUBLIC_URL}/img8.jpg`;
    return (
        <>
            {/* <div className="rounded-xl relative min-h-[100px] h-full">
                
                <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
                    <p className="font-bold text-2xl px-2 pt-4">text</p>
                    <p className="px-2">subtitle</p>
                    <button className="border rounded-xl px-5 py-1 border-white bg-white text-black hover:bg-black/50 hover:text-white border-none mx-2 absolute bottom-4">
                        order
                    </button>
                </div>
                    <img
                    className="h-full w-full object-cover rounded-xl"
                    src="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320"
                    alt="/"
                    />
            </div> */}

            <Card sx={{ minHeight: '250px', height:'100%'}}>
                <CardCover 
                // sx={{
                    // transition: 'transform 0.3s',
                    // '&:hover': {
                    //     filter: 'blur(5px)', // or any other hover effect you want
                    // },
                // }}
                onClick={func}
                >
                    <img
                    src="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320"
                    srcSet="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320&dpr=2 2x"
                    loading="lazy"
                    alt=""
                    />
                </CardCover>
                <CardCover
                    sx={{
                            background:
                            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                        }}
                />
                <CardContent sx={{ justifyContent: 'flex-end' }}>
                    <Typography level="title-lg" textColor="#fff">
                    Yosemite National Park
                    </Typography>
                    <Typography
                        // startDecorator={<LocationOnRoundedIcon />}
                        textColor="neutral.300"
                    >
                        Author: Harvard University
                    </Typography>
                </CardContent>
            </Card>


        </>
    )
}

export default Sidecard;