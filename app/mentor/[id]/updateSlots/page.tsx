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
  DatePicker,
  Flex,
  Avatar,
  Select,
  Form,
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
  CaretDownFilled,
  DoubleRightOutlined,
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
  AntDesignOutlined,
} from "@ant-design/icons";
import RcResizeObserver from "rc-resize-observer";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Divider, Stack, Paper } from "@mui/material";
import Bookings from "@/components/Bookings";

const { Option } = Select;
const { Statistic } = StatisticCard;
const settings = ["Go to Profile", "Dashboard", "Logout"];
const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};

const SlotUpdatePage: React.FC = async () => {
  const [responsive, setResponsive] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let [hr, sethr] = useState(2);

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

  const onChange = (date: any, dateString: any) => {
    console.log(date, dateString);
  };

  const handleChange = (value: any) => {
    // console.log("value selected is ",value);
    sethr(value);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
          <Row gutter={[48, 48]} align="middle" justify="center">
            <div>
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                alt="Travis Howard"
                src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
              />
              <h2>Travis Howard</h2>
            </div>
          </Row>
          <Row>
            <Col xs={{ span: 0 }} lg={{ span: 6 }}></Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                // initialValues={{
                //   remember: true,
                // }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item label="DatePicker">
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  label="Select Duration (Hrs)"
                  rules={[
                    {
                      required: true,
                      message: "Please select duration!",
                    },
                  ]}
                >
                  <Select
                    placeholder="select your slot duration"
                    defaultValue={hr}
                    value={hr}
                    onChange={handleChange}
                  >
                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Select Slot"
                  rules={[
                    {
                      required: true,
                      message: "Please select slot!",
                    },
                  ]}
                >
                  {hr == 1 && (
                    <Select placeholder="select your slot">
                      <Option value="8 - 9">8 - 9 IST</Option>
                      <Option value="9 - 10">9 - 10 IST</Option>
                      <Option value="10 - 11">10 - 11 IST</Option>
                      <Option value="11 - 12">11 - 12 IST</Option>
                      <Option value="12 - 13">12 - 13 IST</Option>
                      <Option value="15 - 16">15 - 16 IST</Option>
                      <Option value="16 - 17">16 - 17 IST</Option>
                      <Option value="17 - 18">17 - 18 IST</Option>
                      <Option value="18 - 19">18 - 19 IST</Option>
                      <Option value="19 - 20">19 - 20 IST</Option>
                      <Option value="21 - 22">21 - 22 IST</Option>
                      <Option value="22 - 23">22 - 23 IST</Option>
                    </Select>
                  )}
                  {hr == 2 && (
                    <Select placeholder="select your slot">
                      <Option value="8 - 10">8 - 10 IST</Option>
                      <Option value="10 - 12">10 - 12 IST</Option>
                      <Option value="12 - 14">12 - 14 IST</Option>
                      <Option value="15 - 17">15 - 17 IST</Option>
                      <Option value="17 - 19">17 - 19 IST</Option>
                      <Option value="20 - 22">21 - 22 IST</Option>
                    </Select>
                  )}
                  {hr == 3 && (
                    <Select placeholder="select your slot">
                      <Option value="8 - 11">8 - 11 IST</Option>
                      <Option value="12 - 15">12 - 15 IST</Option>
                      <Option value="16 - 19">16 - 19 IST</Option>
                      <Option value="20 - 23">20 - 23 IST</Option>
                    </Select>
                  )}
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button variant="contained">Add Slot</Button>
                </Form.Item>
              </Form>
            </Col>
            <Col xs={{ span: 0 }} lg={{ span: 6 }}></Col>
          </Row>

          <Row align="middle" justify="center">
            <Col xs={{ span: 0 }} lg={{ span: 6 }}></Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Divider>
                <h2>Available Slots</h2>
              </Divider>
              <Bookings />
            </Col>
            <Col xs={{ span: 0 }} lg={{ span: 6 }}></Col>
          </Row>
        </PageContainer>
      </div>
    </>
  );
};

export default SlotUpdatePage;
