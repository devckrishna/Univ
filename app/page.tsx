'use client'
import React from "react";
import {Row,Col,Button, Divider,Space} from 'antd';
import { UserAddOutlined, SolutionOutlined,BankFilled } from '@ant-design/icons';
import Link from "next/link";
// import { Link } from "react-router-dom";
import {Typography} from "antd";
import { db } from "@/utils/db";

const { Title } = Typography;
const style: React.CSSProperties = { display:'flex', flexDirection:'column',  justifyContent: 'center', alignItems: 'center' };

const Home:  React.FC = async () => {
  // const user = await db.user.findMany();
  // console.log(user);

  return (
    <div style={{height:'100vh'}}>
        <Row style={{height:'100%'}} justify="center" align="middle">
                    <Col xs={{span: 0}} lg={{span: 6}}></Col>
                    <Col xs={{span:24}} lg={{span: 12}} style={style}>
                            {/* <div> */}
                                <Title style={{fontSize:'80px'}}>UNIV <br></br> CONNECT</Title>
                              
                                <Divider plain>Enter As</Divider>
                                <Space direction="vertical" wrap>
                                    <Button type="primary" block icon={<BankFilled />} >
                                        <Link href={"/university"}>University</Link>
                                    </Button>
                                    <Button type="primary" block icon={<SolutionOutlined />}>
                                        <Link href={"/mentor"}>Mentor</Link>
                                    </Button>
                                    <Button type="primary" block icon={<UserAddOutlined />}>
                                        <Link href={"/mentee"}>Student</Link>
                                    </Button>
                                </Space>
                            {/* </div> */}
                    </Col>
                    <Col xs={{span: 0}} lg={{span: 6}}></Col>
          </Row>
    </div>
  );
};

export default Home;
