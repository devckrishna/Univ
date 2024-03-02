'use client'
import React, { useEffect, useState } from "react";
import {Row,Col, Divider,Space} from 'antd';
import { UserAddOutlined, SolutionOutlined,BankFilled } from '@ant-design/icons';
import Link from "next/link";
import {Typography} from "antd";
import QueueAnim from 'rc-queue-anim';
import { UserButton, useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

const { Title } = Typography;
const style: React.CSSProperties = { display:'flex', flexDirection:'column',  justifyContent: 'center', alignItems: 'center' };

const Home = () => {
  // const user = await db.user.findMany();
  // console.log(user);
  const [mounted, setMounted] = useState(false);
  const { userId,isSignedIn,signOut} = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <></>;
  
  // const checkAuth = () => {
  //   if(userId!==null)redirect('/dashboard');
  // }
  // checkAuth();

  return (
        <div>
            <QueueAnim delay={2000} className="demo-content">
                    <div key="a" style={{height:'100vh'}}>
                        <Row style={{height:'100%'}} justify="center" align="middle">
                                    <Col xs={{span: 0}} lg={{span: 6}}></Col>
                                    <Col xs={{span:24}} lg={{span: 12}} style={style}>
                                            
                                                <Title style={{fontSize:'80px'}}>
                                                    <span className="ml-20">UNIV</span> 
                                                    <br></br> 
                                                    CONNECT
                                                </Title>
                                            
                                                <Divider plain>Enter As</Divider>
                                                <Space direction="vertical" wrap>
                                                    <Button className="w-96">
                                                        <Link href={"/university"}>University</Link>
                                                    </Button>
                                                    <Button className="w-96">
                                                        <Link href={"/mentor"}>Mentor</Link>
                                                    </Button>
                                                    <Button className="w-96">
                                                        <Link href={"/mentee"}>Student</Link>
                                                    </Button>
                                                    <UserButton afterSignOutUrl="/"/>
                                                </Space>
                                            
                                    </Col>
                                    <Col xs={{span: 0}} lg={{span: 6}}></Col>
                        </Row>
                    </div>
            </QueueAnim>
        </div>
  );
};

export default Home;
