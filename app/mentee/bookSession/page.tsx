'use client';
import React, {useEffect, useState} from "react";
import {Pagination, PaginationProps} from 'antd';
import MentorCard from "@/components/MentorCard";
import axios from "axios";
import Loading from "@/components/Loading";
// import Navbar from "@/components/Navbar";
import { useUser } from "@clerk/nextjs";
import QueueAnim from "rc-queue-anim";


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

const AllMentors = () => {
    const {user} = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [mentors,setMentors] = useState<MentorObj[]>([]);
    const [currPage,setCurrPage] = useState(1);
    const [displayMentors,setDisplayMentors] = useState<MentorObj[]>([]);

    const getAllmentors = async() => {
        const data = await axios.get("/api/mentor");
        console.log('current mentors data from booksession page ',data.data.data);
        setMentors(data.data.data);

        if((currPage-1)+5<=data.data.data.length){
            setDisplayMentors(data.data.data.slice(currPage-1,currPage+5));
        }else {
            setDisplayMentors(data.data.data);
        }
        console.log('current mentors data from booksession page heheheu',mentors);
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
    },[]);

    if(isLoading){
        return (<Loading />);
    }else{
            return (
                <>
                    <div style={{background: '#F5F7FA'}}>
                        <div className="p-8">
                            <QueueAnim className="demo-content"
                                key="demo"
                                type={['right', 'left']}
                                ease={['easeOutQuart', 'easeInOutQuart']}>
                                {displayMentors.map((data)=> 
                                    <div key={data.id}>
                                        <MentorCard key={data.id} {...data} />
                                    </div>
                                )}
                            </QueueAnim>
                            {mentors.length>5 && <Pagination defaultCurrent={1} defaultPageSize={5} current={currPage} onChange={onChange} total={mentors.length} />}
                        </div>
                    </div>
                </>
            )
    }
}

export default AllMentors;