"use client";
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Space,
  Descriptions,
  Image,
  Carousel,
} from "antd";
import {
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import {
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";

const items = [
  {
    key: "1",
    label: "Name",
    children: "Cloud Database",
    span: 3,
  },
  {
    key: "2",
    label: "Email",
    children: "Prepaid",
    span: 3,
  },
  {
    key: "3",
    label: "Country",
    children: "YES",
    span: 3,
  },
  {
    key: "4",
    label: "University",
    children: "2018-04-24 18:00:00",
    span: 3,
  },
  {
    key: "5",
    label: "Gender",
    children: "2019-04-24 18:00:00",
    span: 3,
  },
];
const contentStyle: React.CSSProperties = {
  height: "260px",
  color: "#fff",
  lineHeight: "260px",
  textAlign: "center",
  background: "#364d79",
};

type UniversityObj = {
  id: string;
  description: string;
  email: string;
  images: string[];
  name: string;
  bachelor_courses:string[];
  masters_courses:string[];
  address:string;
  website:string;
};


const UnivProfile = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [university,setUniversity] = useState<UniversityObj>({
    id: "abcd",
    description: "",
    email: "",
    images:[],
    name: "",
    bachelor_courses:[],
    masters_courses:[],
    address:"",
    website:""
  })
  const getdetails = async() => {
    console.log("hehehhe");
    const data = await axios.get("/api/university/"+params.id);
    console.log(data.data.data);
    setUniversity(data.data.data);
    console.log("University details ",university);
  }

  useEffect(()=>{
    getdetails();
    setIsLoading(false);
  },[]);

  if(isLoading){
    return (<Loading />)
  }else{
      return (
        <>
          <Navbar profile="/" />

          <div
            style={{
              background: "#F5F7FA",
            }}
          >
            <div className="p-8">
              <Row gutter={[48, 48]}>
                <Col xs={{ span: 24 }} lg={{ span: 10 }}>
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "20px",
                      height: "inherit",
                    }}
                  >
                    <Image
                      src={university.images[university.images.length-1]}
                      preview={{
                        toolbarRender: (
                          _,
                          {
                            transform: { scale },
                            actions: {
                              onFlipY,
                              onFlipX,
                              onRotateLeft,
                              onRotateRight,
                              onZoomOut,
                              onZoomIn,
                            },
                          }
                        ) => (
                          <Space size={12} className="toolbar-wrapper">
                            <SwapOutlined rotate={90} onClick={onFlipY} />
                            <SwapOutlined onClick={onFlipX} />
                            <RotateLeftOutlined onClick={onRotateLeft} />
                            <RotateRightOutlined onClick={onRotateRight} />
                            <ZoomOutOutlined
                              disabled={scale === 1}
                              onClick={onZoomOut}
                            />
                            <ZoomInOutlined
                              disabled={scale === 50}
                              onClick={onZoomIn}
                            />
                          </Space>
                        ),
                      }}
                    />
                    <h2 className="scroll-m-20 pb-2 text-3xl text-center font-semibold tracking-tight first:mt-4">{university.name}</h2>
                    <p className="text-center">
                      {university.description}
                    </p>
                    <Divider>
                      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight m-4">Personal Information</h3>
                    </Divider>
                    <Descriptions bordered items={
                        [
                          {
                            key: "1",
                            label: "Name",
                            children: university.name,
                            span: 3,
                          },
                          {
                            key: "2",
                            label: "Email",
                            children: university.email,
                            span: 3,
                          },
                          {
                            key: "3",
                            label: "Website",
                            children: university.website,
                            span: 3,
                          },
                          {
                            key: "4",
                            label: "Address",
                            children: university.address,
                            span: 3,
                          },
                          {
                            key: "5",
                            label: "Courses",
                            children: university.bachelor_courses,
                            span: 3,
                          },
                        ]
                    } />
                    <Divider>
                      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight m-4">Edit Info</h3>
                    </Divider>
                    <div className="flex flex-col space-y-3">
                        <Link href={`/university/${university.id}`}>
                          <Button className="w-full">Edit Personal Information</Button>
                        </Link>
                        <Link href={`/university/${university.id}/createPost`}>
                          <Button className="w-full">Create New Post</Button>
                        </Link>
                    </div>
                  </div>
                </Col>

                <Col xs={{ span: 24 }} lg={{ span: 14 }}>
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Divider>
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight m-4">Explore Campus</h3>
                      </Divider>
                      <Carousel autoplay>
                        <div>
                          <h3 style={contentStyle}>1</h3>
                        </div>
                        <div>
                          <h3 style={contentStyle}>2</h3>
                        </div>
                        <div>
                          <h3 style={contentStyle}>3</h3>
                        </div>
                        <div>
                          <h3 style={contentStyle}>4</h3>
                        </div>
                      </Carousel>
                    </Col>
                  </Row>

                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Divider>
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight m-4">Posts</h3>
                      </Divider>
                      {/* <Feedbacks /> */}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </>
      );
  }
};

export default UnivProfile;
