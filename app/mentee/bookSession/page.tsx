'use client';
import React,{useEffect, useState} from "react";
import {Row,Col,Space,Card,ConfigProvider,Dropdown,Input,Popover,theme,Descriptions,DatePicker,Flex,Avatar,Select,Form, Pagination, PaginationProps} from 'antd';
import { PageContainer} from '@ant-design/pro-components';
import MentorCard from "@/components/MentorCard";
import axios from "axios";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { useUser } from "@clerk/nextjs";

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
    const {user} = useUser();
    const [isLoading, setIsLoading] = React.useState(true);
    const [mentors,setMentors] = React.useState<MentorObj[]>([]);
    const [currPage,setCurrPage] = React.useState(1);
    const [displayMentors,setDisplayMentors] = React.useState<MentorObj[]>([]);

    const getAllmentors = async() => {
        const data = await axios.get("/api/mentor");
        console.log('current mentors data from booksession page ',data.data.data);
        if(mentors.length == 0)setMentors(data.data.data);

        if((currPage-1)+5<=mentors.length)setDisplayMentors(mentors.slice(currPage-1,currPage+5));
        else setDisplayMentors(mentors.slice(currPage-1));

        console.log('current mentors data from booksession page heheheu',mentors);
        if(mentors.length>0)setIsLoading(false);
    }

    const onChange: PaginationProps['onChange'] = (pageNumber) => {
        setCurrPage(pageNumber);
        if((currPage-1)+5<=mentors.length)setDisplayMentors(mentors.slice(currPage-1,currPage+5));
        else setDisplayMentors(mentors.slice(currPage-1));
      };

    useEffect(()=>{
        getAllmentors();
        console.log("mentors data:",mentors);
    },[mentors]);

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