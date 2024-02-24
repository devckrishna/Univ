'use client'
// import { ProLayout } from "@ant-design/pro-components";
import { Col, Dropdown, Row } from "antd";
import {InfoCircleFilled,LogoutOutlined} from "@ant-design/icons";
import PostCard from "@/components/Post";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

function Post(){
    const router = useRouter();
    const state = useAppSelector(state=>state);

    // useEffect(()=>{
    //     if(state.auth.type == ''){
    //         router.push('/');
    //     }
    // })

    return (
        <>
                <Navbar profile="/"/>
                <Row style={{padding:'0px !important'}}>
                    <Col xs={{ span: 1 }} lg={{ span: 4 }}></Col>
                    <Col xs={{ span: 22 }} lg={{ span: 16 }} className="p-8 my-4" style={{border:'1px solid rgba(209, 213, 219,1)'}}><PostCard /></Col>
                    <Col xs={{ span: 1 }} lg={{ span: 4 }}></Col>
                </Row>
        </>
    )

}

export default Post;