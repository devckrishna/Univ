'use client';
import React from "react";
import {Row,Col} from 'antd';
import SLogin from "@/components/SLogin";
import img12 from '../../../public/img12.png'

const MenteeAuthForm:  React.FC = () => {

    // let location = useLocation();
    //  console.log(location)
     const backgroundStyle = {
        backgroundImage: `url(${img12.src})`,
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
                       <Col xs={{span:1}} lg={{span:6}}></Col>
                       <Col xs={{span: 22}} lg={{span: 18}}><SLogin /></Col>
                       <Col xs={{span:1}} lg={{span:0}}></Col>
                     </>
                </Row>
                </div>
        </>
     )

}

export default MenteeAuthForm;