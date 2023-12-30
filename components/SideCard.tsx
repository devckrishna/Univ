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
import { redirect } from 'next/navigation';

const Sidecard:  React.FC = () => {

    const func = () => redirect('/dashboard/:id');

    // const backgroundImageUrl = `${process.env.PUBLIC_URL}/img8.jpg`;
    return (
        <>
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