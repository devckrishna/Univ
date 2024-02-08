'use client';
import React,{ useState } from "react";
import {Row,Col} from 'antd';
// import { useLocation } from "react-router-dom";
// import MRegister from "../subcomponents/MRegister";
import MRegister from "@/components/MRegister";
import img9 from '../../../public/img9.jpg';
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const MentorAuthForm:  React.FC = () => {

    // let location = useLocation();
    //  console.log(location);
     const backgroundStyle = {
        backgroundImage: `url(${img9.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
        // display:'flex',
        // justifyContent: 'center',
        // alignItems:'center'
     }

     return (
        <>
        <div style={{height:'100vh'}}>
                <Row style={backgroundStyle} justify="center" align="middle">
                     <>
                       <Col xs={{span:1}} lg={{span:4}}></Col>
                       <Col xs={{span: 22}} lg={{span: 20}}><MRegister /></Col>
                       <Col xs={{span:1}} lg={{span:0}}></Col>
                     </>
                </Row>
                </div>
        </>
     )

}

export default MentorAuthForm;