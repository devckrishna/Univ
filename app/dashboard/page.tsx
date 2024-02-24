"use client";
import React, { useEffect, useState } from "react";
import {
  Row,Col,Divider,Carousel,} from "antd";
import Link from "next/link";
import Verticalcard from "@/components/VerticalCard";
import Sidecard from "@/components/SideCard";
// import { auth, clerkClient, useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
// import { db } from "@/utils/db";

const Dashboard = () => {
    
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '400px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  let [posts, setposts] = useState([]);
  const [profile,setProfile] = useState("/");
  // const { userId} = useAuth();

  async function fetchPosts() {
    const res = await fetch('http://localhost:3000/api/posts');
    const data = await res.json();
    setposts(data);
  }
//   const isUserRegistered = async () => {
//     const {userId} = auth();
//     if(userId){
//             const user = clerkClient.users.getUser(userId ?? "");
//             const email = (await user).emailAddresses[0].emailAddress;
//             const dbUsermentor = await db.mentor.findFirst({
//                 where: {
//                 email: email,
//                 },
//             });
//             const dbUserStudent = await db.student.findFirst({
//                 where:{
//                     email:email
//                 }
//             })
//             if (!dbUsermentor && !dbUserStudent) {
//                 redirect("/");
//             }
//             if(dbUserStudent){
//                setProfile(`/mentee/${dbUserStudent.id}`);
//             }
//             if(dbUsermentor){
//                 setProfile(`/mentor/${dbUsermentor.id}`);
//             }
//     }
// }

  useEffect(() => {
    // console.log(userId)
    // if(!userId)redirect("/onboarding");
    // isUserRegistered();
    fetchPosts();
  }, []);

  const onChange = (currentSlide: number) => {
    // console.log(currentSlide);
  };

  return (
    <>
        <Navbar profile={profile} />
        {/* <PageContainer content=""> */}
            <Row>
                <Col span={24}>
                    <Carousel afterChange={onChange} autoplay={true}>
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

            <div style={{ marginLeft: "3%", marginRight: '3%', marginBottom:'3%'}}>
                {/* <div style={{ margin: "20px" }}> */}
                  <div className="my-6">
                    <Divider orientation="center">
                      <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight first:mt-0">Most Recent Blogs</h2>
                    </Divider>
                  </div>

                  <Row gutter={[48, 48]}>

                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                        <Row gutter={[0,8]}>
                          <Col xs={{span:24}} ><Sidecard /></Col> 
                          <Col xs={{span:24}} ><Sidecard /></Col> 
                        </Row>  
                    </Col>

                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                      <Sidecard />
                    </Col>

                  </Row>
            </div>

            <div style={{ marginLeft: "3%", marginRight: '3%', marginBottom:'3%'}}>
                  {/* <Row> */}
                      <Divider orientation="center">
                        <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight first:mt-0">All Posts</h2>
                      </Divider>
                      <Row gutter={[48, 48]}>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                          <Verticalcard />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                          <Verticalcard />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                          <Verticalcard />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                          <Verticalcard />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                          <Verticalcard />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                          <Verticalcard />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                          <Verticalcard />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                          <Verticalcard />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                          <Verticalcard />
                        </Col>
                      </Row>      
            </div>

        {/* </PageContainer> */}
      
    </>
  );
}

export default Dashboard;
