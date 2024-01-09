import React from "react";
import {Row,Col,Button, Divider,Space} from 'antd';
import { UserAddOutlined, SolutionOutlined,BankFilled } from '@ant-design/icons';
import Link from "next/link";
// import { Link } from "react-router-dom";
import {Typography} from "antd";
import img from '../../public/img7.jpg';

const { Title } = Typography;
const style: React.CSSProperties = { display:'flex', flexDirection:'column',  justifyContent: 'center', alignItems: 'center' };
// const backgroundImageUrl = `../../public/img7.jpg`;
// console.log(backgroundImageUrl);
const backgroundStyle: React.CSSProperties = { 
        backgroundImage: `url(${img.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%'
 };

const UniversityAuth:  React.FC = () => {

  return (
    <>
        <div style={{height:'100vh'}}>
                <Row style={{height:'100%'}} justify="center" align="middle">
                    <Col xs={{span: 0}} lg={{span: 14}} style={backgroundStyle}></Col>
                    <Col xs={{span:24}} lg={{span:10}} style={style}>
                        <div>
                            <Space direction="vertical" wrap>
                                <Button type="primary" block >
                                    <Link href={"/university/register"}>Register</Link>
                                </Button>
                                <Button type="primary" block>
                                    <Link href={"/university/login"}>Login</Link>
                                </Button>
                            </Space>
                        </div> 
                    </Col>
                </Row>
        </div>
    </>
  );
};

export default UniversityAuth;
