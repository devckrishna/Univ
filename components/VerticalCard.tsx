import React from 'react';
// import AspectRatio from '@mui/joy/AspectRatio';
// import Button from '@mui/joy/Button';
// import Card from '@mui/joy/Card';
// import CardContent from '@mui/joy/CardContent';
// import IconButton from '@mui/joy/IconButton';
// import Typography from '@mui/joy/Typography';
// import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
// import { ProCard } from '@ant-design/pro-components';
// import Link from 'next/link';
// import { Button } from 'antd';
import img8 from '../public/img8.jpg'
import { Button } from './ui/button';
// import { Card } from 'antd';
// const { Meta } = Card;

const Verticalcard:  React.FC = () => {
    // const backgroundImageUrl = `${process.env.PUBLIC_URL}/img8.jpg`;
    return (
        <>
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="rounded-t-lg w-full" src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286" alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Duis est ullamco culpa aute fugiat qui aliqua in. Qui dolore veniam dolore laborum commodo. Mollit id laborum cillum voluptate veniam nisi laboris. Duis incididunt dolor fugiat esse velit consequat cillum elit qui. Laborum mollit magna reprehenderit amet enim aliqua elit eiusmod reprehenderit amet velit.</p>
                    <Button className='w-full'>Read More</Button>
                    {/* <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a> */}
                </div>
            </div>

            
        </>
    )
}

export default Verticalcard;