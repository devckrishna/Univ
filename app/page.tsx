'use client'
import React, { useEffect, useState } from "react";
import {Row,Col, Divider,Space} from 'antd';
import { UserAddOutlined, SolutionOutlined,BankFilled } from '@ant-design/icons';
import Link from "next/link";
import QueueAnim from 'rc-queue-anim';
import { UserButton, useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import logo_convarse from '../public/logo_convarse.png';
import Image from "next/image";

const style: React.CSSProperties = { display:'flex', flexDirection:'column',  justifyContent: 'center', alignItems: 'center' };
const backgroundStyle: React.CSSProperties = { 
    width: '100%',
    height: '100%'
};

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const { userId,isSignedIn,signOut} = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <></>;
  
  const checkAuth = () => {
    if(userId!==null)redirect('/dashboard');
  }
  checkAuth();

  return (
                <div>
                    <QueueAnim delay={1500} duration={700} className="demo-content">

                    {/* <div style={{height:'100vh'}}>
                            <Row style={{height:'100%'}} justify="center" align="middle">
                            
                                <Col xs={{span:24}} lg={{span:12}} style={style}>

                                    <div className="flex min-h-full w-11/12 flex-1 flex-col justify-center px-2 py-12 lg:px-4">
                                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                            <img
                                                className="mx-auto h-10 w-auto"
                                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                                alt="Your Company"
                                            />
                                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                                Create a Mentor Account
                                            </h2>
                                            <p className="text-sm text-center text-muted-foreground">
                                                Click Sign-Up to create a new account
                                            </p>
                                        </div>

                                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                            <form className="space-y-2" action="#" method="POST">
                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="flex w-full justify-center rounded-md bg-blue-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        <Link href={"/sign-up"}>Sign Up </Link>
                                                    </button>
                                                    
                                                </div>
                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="flex w-full justify-center rounded-md bg-blue-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                    <Link href={"/sign-in"}>Log In </Link>
                                                    </button>
                                                    
                                                </div>
                                            </form>

                                            <p className="mt-6 text-center text-sm text-gray-500">
                                                Not a member?{' '}
                                                <a href="/" className="font-semibold leading-6 text-blue-800 hover:text-blue-500">
                                                    Back to Main
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={{span: 0}} lg={{span: 12}} style={backgroundStyle}>
                                    <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                                        <div className="absolute inset-0 bg-blue-800" />
                                        <div className="relative z-20 flex items-center text-lg font-medium">
                                            <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="mr-2 h-6 w-6"
                                            >
                                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                                            </svg>
                                            ConVarse
                                        </div>
                                        <div className="relative z-20 mt-auto">
                                            <blockquote className="space-y-2">
                                            <p className="text-lg">
                                                &ldquo;The delicate balance of mentoring someone is not creating them in your own image, 
                                                but giving them the opportunity to create themselves.&rdquo;
                                            </p>
                                            <footer className="text-sm">Steven Spielberg</footer>
                                            </blockquote>
                                        </div>
                                    </div>
                                </Col>

                            </Row>
                    </div>
 */}

                            <div key="a" style={{height:'100vh'}}>
                                <Row style={{height:'100%'}} justify="center" align="middle">
                                            <Col xs={{span: 0}} lg={{span: 6}}>
                                            </Col>
                                            <Col xs={{span:24}} lg={{span: 12}} className="flex flex-col justify-center items-center">
                                                    
                                                        {/* <h1 className="font-bold tracking-tight text-gray-900 text-8xl">
                                                             <span className="ml-2">ConVarse</span>
                                                             <br></br>
                                                        </h1> */}
                                                        <Image className="h-32 w-auto" src={logo_convarse} alt="loading" />
                                                    
                                                        <p className="my-6 mx-4 text-lg leading-8 text-gray-600 text-center">
                                                             <span>Unlock global opportunities with our platform,</span> 
                                                             <br></br>
                                                             <span>bridging students to top universities</span>
                                                             <br></br>
                                                             <span>& offering mentorship from seasoned mentors</span>
                                                             <br></br>
                                                             <span>for successful career journeys.</span> 
                                                        </p>

                                                        <Divider plain>
                                                            <p className="text-xl">Enter As</p>
                                                        </Divider>
                                                        <Space direction="vertical" wrap>
                                                            <Button className="w-96 bg-blue-900 hover:bg-blue-600">
                                                                <Link href={"/university"}>University</Link>
                                                            </Button>
                                                            <Button className="w-96 bg-blue-900 hover:bg-blue-600">
                                                                <Link href={"/mentor"}>Mentor</Link>
                                                            </Button>
                                                            <Button className="w-96 bg-blue-900 hover:bg-blue-600">
                                                                <Link href={"/mentee"}>Student</Link>
                                                            </Button>
                                                            <UserButton afterSignOutUrl="/"/>
                                                        </Space>
                                                    
                                            </Col>
                                            <Col xs={{span: 0}} lg={{span: 6}}>
                                            {/* <Select
                                                placeholder="Select a option"
                                                // onChange={onGenderChange}
                                                allowClear
                                            >
                                                {country_list.map((c)=><Option value={c}>{c}</Option>)}
                                            </Select> */}

                                            </Col>
                                </Row>
                            </div>


                    </QueueAnim>
                </div>        
                   
  );
};

export default Home;
