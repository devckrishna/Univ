'use client'
import React from "react";
import {Row,Col, Divider,Space} from 'antd';
import Link from "next/link";
// import img4 from '../../public/img4.jpg';
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


const style: React.CSSProperties = { display:'flex', flexDirection:'column',  justifyContent: 'center', alignItems: 'center' };
const backgroundStyle: React.CSSProperties = { 
        // backgroundImage: `url(${img4.src})`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        width: '100%',
        height: '100%'
 };

const MenteeAuth = () => {

    const {user} = useUser();
    function checkCredentials(){
        if(user)redirect("/dashboard");
    }
    checkCredentials();

    return (
        <>
            <div style={{height:'100vh'}}>
                    <Row style={{height:'100%'}} justify="center" align="middle">
                        <Col xs={{span: 0}} lg={{span: 12}}style={backgroundStyle}>
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
                                    UnivConnect
                                </div>
                                <div className="relative z-20 mt-auto">
                                    <blockquote className="space-y-2">
                                    <p className="text-lg">
                                        &ldquo;This library has saved me countless hours of work and
                                        helped me deliver stunning designs to my clients faster than
                                        ever before.&rdquo;
                                    </p>
                                    <footer className="text-sm">Sofia Davis</footer>
                                    </blockquote>
                                </div>
                            </div>
                        </Col>
                        <Col xs={{span:24}} lg={{span:12}} style={style}>
                            
                        <div className="flex min-h-full w-11/12 flex-1 flex-col justify-center px-2 py-12 lg:px-4">
                                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                    <img
                                        className="mx-auto h-10 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                        alt="Your Company"
                                    />
                                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                        Create a Student Account
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
                    </Row>
            </div>
        </>
    );
};

export default MenteeAuth;
