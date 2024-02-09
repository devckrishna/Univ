'use client';
import React,{useEffect, useState} from "react";
import {Row,Col,Space,Card,ConfigProvider,Dropdown,Input,Popover,theme,Descriptions,DatePicker,Flex,Avatar,Select,Form, Pagination, PaginationProps} from 'antd';
import { PageContainer} from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import Link from "next/link";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Divider,Stack,Paper  } from '@mui/material';
import {CardActions,CardContent,CardMedia,CardHeader   } from "@mui/material";
import MentorCard from "@/components/MentorCard";
import axios from "axios";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";

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

const AllMentors:  React.FC = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [mentors,setMentors] = React.useState([]);
    const [currPage,setCurrPage] = React.useState(1);
    const [displayMentors,setDisplayMentors] = React.useState<MentorObj[]>([]);

    const getAllmentors = async() => {
        const data = await axios.get("/api/mentor");
        console.log(data.data.data);
        setMentors(data.data.data);

        if((currPage-1)+5<=mentors.length)setDisplayMentors(mentors.slice(currPage-1,currPage+5));
        else setDisplayMentors(mentors.slice(currPage-1));

        setIsLoading(false);
    }

    const onChange: PaginationProps['onChange'] = (pageNumber) => {
        setCurrPage(pageNumber);
        if((currPage-1)+5<=mentors.length)setDisplayMentors(mentors.slice(currPage-1,currPage+5));
        else setDisplayMentors(mentors.slice(currPage-1));
      };

    useEffect(()=>{
        getAllmentors();
        console.log("mentors data:",mentors);
    })

    if(isLoading){
        return (<Loading />);
    }else{
            return (
                <>
                    <Navbar />
                    <div
                        style={{
                            background: '#F5F7FA',
                        }}
                        >
                        <PageContainer className="flex justify-center items-center">
                            {displayMentors.map((data)=><MentorCard key={data.name} {...data} />)}
                            {mentors.length>5 && <Pagination defaultCurrent={1} defaultPageSize={5} current={currPage} onChange={onChange} total={mentors.length} />}
                        </PageContainer>
                    </div>
                </>
            )
    }
}

export default AllMentors;