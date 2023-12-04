"use client";
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Divider,
  Space,
  Card,
  Avatar,
  Pagination,
  ConfigProvider,
  Dropdown,
  Input,
  Popover,
  theme,
} from "antd";
import {
  CaretDownFilled,
  DoubleRightOutlined,
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  SettingDrawer,
} from "@ant-design/pro-components";
import Link from "next/link";
import Verticalcard from "@/components/VerticalCard";
import Sidecard from "@/components/SideCard";

function Dashboard() {
  // const backgroundImageUrl = `${process.env.PUBLIC_URL}/img8.jpg`;
  const headingStyle = {
    color: "black !important",
    textAlign: "left !important",
  };
  let [posts, setposts] = useState([]);
  const [settings, setSetting] = useState({
    fixSiderbar: true,
    layout: "mix",
    splitMenus: true,
  });

  async function fetchPosts() {
    // const res = await fetch('/api/v1/posts');
    // const data = res.json();
    // setposts(posts);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <ProLayout
        prefixCls="my-prefix"
        token={
          {
            // colorBgMenuItemSelected: 'white',
            //   bgLayout: 'white',
          }
        }
        title="UnivConnect"
        layout="top"
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
        <PageContainer content="">
          <div>
            <div style={{ margin: "20px" }}>
              <Divider orientation="center">
                <h2>Most Recent Blogs</h2>
              </Divider>
              <Row gutter={[48, 48]}>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <Verticalcard />
                </Col>

                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <Space direction="vertical" size="large">
                    <Row>
                      <Sidecard />
                    </Row>
                    <Row>
                      <Sidecard />
                    </Row>
                  </Space>
                </Col>
              </Row>
            </div>

            <div style={{ margin: "20px" }}>
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
              </Row>

              {/* <Row gutter={[16,16]}>
                                        <Col xs={{span:24}} lg={{span:8}}><Verticalcard /></Col>
                                        <Col xs={{span:24}} lg={{span:8}}><Verticalcard /></Col>
                                        <Col xs={{span:24}} lg={{span:8}}><Verticalcard /></Col>
                                </Row> */}
              <Row>
                {" "}
                <Pagination
                  defaultCurrent={1}
                  total={50}
                  showLessItems={true}
                />{" "}
              </Row>

              {/* </Row> */}
            </div>
          </div>
        </PageContainer>
      </ProLayout>
    </>
  );
}

export default Dashboard;
