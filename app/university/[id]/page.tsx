"use client";
import React, { useState } from "react";
import {
  Row,
  Col,
  Space,
  Card,
  ConfigProvider,
  Dropdown,
  Input,
  Popover,
  theme,
  Descriptions,
  Flex,
  Avatar,
  Image,
  Carousel,
} from "antd";
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  SettingDrawer,
  StatisticCard,
} from "@ant-design/pro-components";
import {
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import RcResizeObserver from "rc-resize-observer";
import Link from "next/link";
import {
  Divider,
  Stack,
  Paper,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import Feedbacks from "@/components/Feedbacks";
// import Bookings from "../subcomponents/Bookings";
// import Feedbacks from "../subcomponents/Feedbacks";

const { Statistic } = StatisticCard;
const settings = ["Go to Profile", "Dashboard", "Logout"];
const items = [
  {
    key: "1",
    label: "Name",
    children: "Cloud Database",
    span: 3,
  },
  {
    key: "2",
    label: "Email",
    children: "Prepaid",
    span: 3,
  },
  {
    key: "3",
    label: "Country",
    children: "YES",
    span: 3,
  },
  {
    key: "4",
    label: "University",
    children: "2018-04-24 18:00:00",
    span: 3,
  },
  {
    key: "5",
    label: "Gender",
    children: "2019-04-24 18:00:00",
    span: 3,
  },
];
const contentStyle: React.CSSProperties = {
  height: "260px",
  color: "#fff",
  lineHeight: "260px",
  textAlign: "center",
  background: "#364d79",
};

const UnivProfile: React.FC = async () => {
  const [responsive, setResponsive] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      <AppBar position="static" color="transparent">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              UnivConnect
            </Typography>

            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            ></Box>

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <div
        style={{
          background: "#F5F7FA",
        }}
      >
        <PageContainer>
          <Row gutter={[48, 48]}>
            <Col xs={{ span: 24 }} lg={{ span: 10 }}>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  height: "inherit",
                }}
              >
                <Image
                  src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
                  preview={{
                    toolbarRender: (
                      _,
                      {
                        transform: { scale },
                        actions: {
                          onFlipY,
                          onFlipX,
                          onRotateLeft,
                          onRotateRight,
                          onZoomOut,
                          onZoomIn,
                        },
                      }
                    ) => (
                      <Space size={12} className="toolbar-wrapper">
                        <SwapOutlined rotate={90} onClick={onFlipY} />
                        <SwapOutlined onClick={onFlipX} />
                        <RotateLeftOutlined onClick={onRotateLeft} />
                        <RotateRightOutlined onClick={onRotateRight} />
                        <ZoomOutOutlined
                          disabled={scale === 1}
                          onClick={onZoomOut}
                        />
                        <ZoomInOutlined
                          disabled={scale === 50}
                          onClick={onZoomIn}
                        />
                      </Space>
                    ),
                  }}
                />
                <h2>Chirag Jindal</h2>
                <p>
                  {" "}
                  excepteur. Nostrud ea occaecat ad dolore commodo tempor ut
                  pariatur. Veniam Lorem Lorem adipisicing sit occaecat nostrud
                  occaecat ex adipisicing deserunt id anim duis. Eiusmod aliqua
                  minim veniam id ea amet nulla exercitation cupidatat do enim
                  adipisicing incididunt.
                </p>
                <Divider>
                  <h2>Personal Information</h2>
                </Divider>
                <Descriptions bordered items={items} />
                <Divider>
                  <h2>Edit Info</h2>
                </Divider>
                <Stack spacing={2} direction="column">
                  <Button variant="contained">Edit Personal Information</Button>
                  <Button variant="contained">
                    <Link href={`/university/createPost`}>
                      {" "}
                      Create New Post{" "}
                    </Link>
                  </Button>
                </Stack>
              </div>
            </Col>

            <Col xs={{ span: 24 }} lg={{ span: 14 }}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Divider>
                    <h2>Explore Campus</h2>
                  </Divider>
                  <Carousel autoplay>
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

              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Divider>
                    <h2>Posts</h2>
                  </Divider>
                  {/* <Feedbacks /> */}
                </Col>
              </Row>
            </Col>
          </Row>
        </PageContainer>
      </div>
    </>
  );
};

export default UnivProfile;
