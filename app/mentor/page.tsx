'use client'
import React from "react";
import {Row,Col,Divider,Space} from 'antd';
import { UserAddOutlined, SolutionOutlined,BankFilled } from '@ant-design/icons';
import Link from "next/link";
import {Typography} from "antd";
import img8 from '../../public/img8.jpg'
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { db } from "@/utils/db";

const { Title } = Typography;
const style: React.CSSProperties = { display:'flex', flexDirection:'column',  justifyContent: 'center', alignItems: 'center' };
const backgroundStyle: React.CSSProperties = { 
        backgroundImage: `url(${img8.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%'
 };

const MentorAuth:  React.FC = () => {
    const {user} = useUser();
    function checkCredentials(){
        if(user)redirect("/dashboard");
    }
    checkCredentials();

    return (
        <>
            <div style={{height:'100vh'}}>
                    <Row style={{height:'100%'}} justify="center" align="middle">
                        <Col xs={{span: 0}} lg={{span: 14}}style={backgroundStyle}></Col>
                        <Col xs={{span:24}} lg={{span:10}} style={style}>
                            <div>
                                <Space direction="vertical" wrap>
                                    <Button  className="w-96">
                                        <Link href={"/sign-up"}>Register</Link>
                                    </Button>
                                    <Button  className="w-96">
                                        <Link href={"/sign-in"}>Login</Link>
                                    </Button>
                                </Space>
                            </div> 
                        </Col>
                    </Row>
                </div>
        </>
  );
};

export default MentorAuth;
