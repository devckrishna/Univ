"use client";
import React, { useEffect, useState } from "react";
import {
  Row,Col,Button,Divider,Space,Card,Avatar,Pagination,ConfigProvider,Dropdown,Input,Popover,theme,Carousel,} from "antd";
import {CaretDownFilled,DoubleRightOutlined,GithubFilled,InfoCircleFilled,LogoutOutlined,PlusCircleFilled,QuestionCircleFilled,SearchOutlined,} from "@ant-design/icons";
import {PageContainer,ProCard,ProConfigProvider,ProLayout,SettingDrawer,} from "@ant-design/pro-components";
import Link from "next/link";
import Verticalcard from "@/components/VerticalCard";
import Sidecard from "@/components/SideCard";

function Dashboard() {
  // const backgroundImageUrl = `${process.env.PUBLIC_URL}/img8.jpg`;
  const headingStyle = {
    color: "black !important",
    textAlign: "left !important",
  };
    
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '400px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  let [posts, setposts] = useState([]);
  const [settings, setSetting] = useState({
    fixSiderbar: true,
    layout: "mix",
    splitMenus: true,
  });

  async function fetchPosts() {
    const res = await fetch('http://localhost:3000/api/posts');
    const data = await res.json();
    setposts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const onChange = (currentSlide: number) => {
    // console.log(currentSlide);
  };

  return (
    <>
      {/* <Navbar /> */}
      <ProLayout
        // prefixCls="my-prefix"
        token={
          {
            // colorBgMenuItemSelected: 'white',
              // bgLayout: 'white',
          }
        }
        title="UnivConnect"
        layout="top"
        style={{padding:'0px !important', margin:'0px !important'}}
        //   collapsed={true}
        //   colorBgHeader={"black"}
        avatarProps={{
          src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
          size: "small",
          title: "",
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "Go to Profile",
                      icon: <InfoCircleFilled />,
                      label: "Profile",
                    },
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "Logout",
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
      >
      {/* </ProLayout> */}

        {/* <PageContainer content=""> */}
            <Row>
                <Col span={24}>
                    <Carousel afterChange={onChange} autoplay={true}>
                        <div>
                          <h3 style={contentStyle}>1</h3>
                        </div>
                        <div>
                          <h3 style={contentStyle}>2</h3>
                        </div>
                        <div>
                          <h3 style={contentStyle}>3</h3>
                        </div>
                        <div>
                          <h3 style={contentStyle}>4</h3>
                        </div>
                    </Carousel>

                </Col>
            </Row>

            <div style={{ marginLeft: "3%", marginRight: '3%', marginBottom:'3%'}}>
                {/* <div style={{ margin: "20px" }}> */}
                  <Divider orientation="center">
                    <h2 style={{color:'black !important'}}>Most Recent Blogs</h2>
                  </Divider>

                  <Row gutter={[48, 48]}>

                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                        <Row gutter={[0,8]}>
                          <Col xs={{span:24}} ><Sidecard /></Col> 
                          <Col xs={{span:24}} ><Sidecard /></Col> 
                        </Row>  
                    </Col>

                    <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{height:'100% !important'}}>
                      <Sidecard />
                    </Col>

                  </Row>
            </div>

            <div style={{ marginLeft: "3%", marginRight: '3%', marginBottom:'3%'}}>
                  {/* <Row> */}
                      <Divider orientation="center">
                        <h2>See All Posts</h2>
                      </Divider>
                      <Row gutter={[48, 48]}>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                          <Verticalcard />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                          <Verticalcard />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                          <Verticalcard />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                          <Verticalcard />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                          <Verticalcard />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                          <Verticalcard />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                          <Verticalcard />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                          <Verticalcard />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                          <Verticalcard />
                        </Col>
                      </Row>      
            </div>

        {/* </PageContainer> */}
      </ProLayout>
    </>
  );
}

export default Dashboard;
