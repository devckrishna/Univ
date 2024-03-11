'use client'
import React, { useEffect, useState } from "react";
import {Row,Col, Divider,Space} from 'antd';
import { UserAddOutlined, SolutionOutlined,BankFilled } from '@ant-design/icons';
import Link from "next/link";
import QueueAnim from 'rc-queue-anim';
import { UserButton, useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

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
  
  const checkAuth = () => {
    if(userId!==null)redirect('/dashboard');
  }
  checkAuth();

  return (
                <div>
                    <QueueAnim delay={2000} className="demo-content">
                            <div key="a" style={{height:'100vh'}}>
                                <Row style={{height:'100%'}} justify="center" align="middle">
                                            <Col xs={{span: 0}} lg={{span: 6}}>
                                                {/* <div
                                                    className="absolute inset-x-0 transform-gpu overflow-hidden blur-3xl"
                                                    aria-hidden="true"
                                                    >
                                                    <div
                                                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                                                        style={{
                                                        clipPath:
                                                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                                        }}
                                                    />
                                                </div> */}
                                            </Col>
                                            <Col xs={{span:24}} lg={{span: 12}} className="flex flex-col justify-center items-center">
                                                    
                                                        <h1 className="font-bold tracking-tight text-gray-900 text-8xl">
                                                             <span className="ml-20">Convarsor</span>
                                                             <br></br>
                                                        </h1>
                                                    
                                                        <p className="my-6 mx-4 text-lg leading-8 text-gray-600">
                                                             <span>Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui.</span>
                                                             <br></br>
                                                             <span className="ml-28">fugiat veniam occaecat fugiat aliqua.</span> 
                                                        </p>

                                                        <Divider plain>Enter As</Divider>
                                                        <Space direction="vertical" wrap>
                                                            <Button className="w-96 bg-blue-800 hover:bg-blue-600">
                                                                <Link href={"/university"}>University</Link>
                                                            </Button>
                                                            <Button className="w-96 bg-blue-800 hover:bg-blue-600">
                                                                <Link href={"/mentor"}>Mentor</Link>
                                                            </Button>
                                                            <Button className="w-96 bg-blue-800 hover:bg-blue-600">
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
                        // <div className="bg-white">
                        //                 <div className="relative isolate">
                        //                     <div
                            //                     className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl"
                            //                     aria-hidden="true"
                            //                     >
                        //                         <div
                        //                             className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        //                             style={{
                        //                             clipPath:
                        //                                 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        //                             }}
                        //                         />
                        //                     </div>
                        //                     <div className="mx-auto max-w-2xl pt-48 sm:pt-48 lg:pt-56">
                                            
                        //                     <div className="text-center">
                        //                         <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        //                             UniConnect
                        //                         </h1>
                        //                         <p className="mt-6 text-lg leading-8 text-gray-600">
                        //                             Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                        //                             fugiat veniam occaecat fugiat aliqua.
                        //                         </p>
                        //                         <div className="mt-10 flex items-center justify-center gap-x-6">
                        //                         <a
                        //                             href="#"
                        //                             className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        //                         >
                        //                             Get started
                        //                         </a>
                        //                         <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        //                             Learn more <span aria-hidden="true">→</span>
                        //                         </a>
                        //                         </div>
                        //                     </div>
                        //                     </div>
                                            
                        //                 </div>
                        //             </div>         
                   
  );
};

export default Home;
