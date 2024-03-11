"use client";
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Space,
  Descriptions,
  Image,
  Carousel,
  Divider,
} from "antd";
import {
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import UniversityPosts from "@/components/UniversityPosts";
import { useToast } from "@/components/ui/use-toast";

const contentStyle: React.CSSProperties = {
  backgroundSize:"cover",
  backgroundRepeat:"no-repeat",
  width:'80%',
  height:'200px !important'
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

type PostSchema = {
  id:string;
    title:string;
    images:string[];
    description:string;
    created_at:Date,
    university_name:string
}


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
  const [posts,setPosts] = useState<PostSchema[]>([]);
  const {toast} = useToast();
  const getdetails = async() => {
    console.log("hehehhe");
    const data = await axios.get("/api/university/"+params.id);
    console.log(data.data.data);
    setUniversity(data.data.data);
    console.log("University details ",university);
    getPosts(data.data.data.email);
  }

  const getPosts = async(email:string) => {
    const res = await fetch('/api/getPosts',{
      method:"POST",
      body: JSON.stringify({
        uEmail:email
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await res.json();
    console.log(data);
    setPosts(data.data);
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
                    <h2 className="scroll-m-20 py-2 text-3xl text-center font-semibold tracking-tight first:mt-4">{university.name}</h2>
                    <p className="text-center">
                      {university.description}
                    </p>
                    <Divider><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight m-4">Personal Information</h3></Divider>
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
                          <Button className="w-full" onClick={()=>toast({
                                                  title: "Coming soon !",
                                                  description: "Will be added for next version !",
                                          })}>Edit Personal Information</Button>
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
                        {university.images.map((img)=>(
                        <div key={img} style={contentStyle}>
                          <img src={img} alt="" style={{height:'400px',width:'100%'}}></img>
                        </div>
                        ))}
                      </Carousel>
                    </Col>
                  </Row>

                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Divider>
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight m-4">Posts</h3>
                      </Divider>
                      { posts.length>0 && <UniversityPosts posts={posts} />}
                      {posts.length ==0 && 
                      <>
                        <div id="alert-additional-content-1" className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                              <div className="flex items-center">
                                <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span className="sr-only">Info</span>
                                <h3 className="text-lg font-medium">No Posts to show !</h3>
                              </div>
                              <div className="mt-2 mb-4 text-sm">
                                Hey there ! 
                                You havent't posted in a while ! Try posting more for student engagemenet. 
                              </div>
                              <div className="flex">
                                <Link href={`/university/${university.id}/createPost`}>
                                  <button type="button" className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                      <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                                    </svg>
                                    Create Post
                                  </button>
                                </Link>
                              </div>
                        </div>
                      </>}
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
