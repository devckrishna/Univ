'use client'
import React from "react";
import {Row,Col,Space} from 'antd';
import Link from "next/link";
import img8 from '../../public/img8.jpg'
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

const style: React.CSSProperties = { display:'flex', flexDirection:'column',  justifyContent: 'center', alignItems: 'center' };
const backgroundStyle: React.CSSProperties = { 
        backgroundImage: `url(${img8.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%'
 };

const MentorAuth = () => {
    const {user} = useUser();
    function checkCredentials(){
        if(user)redirect("/dashboard");
    }
    checkCredentials();

    return (
        <>
            <div style={{height:'100vh'}}>
                    <Row style={{height:'100%'}} justify="center" align="middle">
                        <Col xs={{span: 0}} lg={{span: 12}} style={backgroundStyle}></Col>
                        <Col xs={{span:24}} lg={{span:12}} style={style}>

                            <div className="flex min-h-full w-11/12 flex-1 flex-col justify-center px-2 py-12 lg:px-4">
                                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                    <img
                                        className="mx-auto h-10 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                        alt="Your Company"
                                    />
                                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                        Enter as a Mentor
                                    </h2>
                                </div>

                                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                    <form className="space-y-6" action="#" method="POST">
                                        <div>
                                            <button
                                                type="submit"
                                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                <Link href={"/sign-up"}>Sign Up </Link>
                                            </button>
                                            
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                               <Link href={"/sign-in"}>Log In </Link>
                                            </button>
                                            
                                        </div>
                                    </form>

                                    <p className="mt-10 text-center text-sm text-gray-500">
                                        Not a member?{' '}
                                        <a href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                            Back to Main
                                        </a>
                                    </p>
                                </div>
                            </div>


                        </Col>
                    </Row>
                </div>
        </>
  );
};

export default MentorAuth;
