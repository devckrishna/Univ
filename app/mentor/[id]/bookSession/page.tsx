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
import MentorBookingCard from "@/components/MentorBookingCard";
import SessionBookingForm from "@/components/SessionBookingForm";

const { Option } = Select;
const { Statistic } = StatisticCard;
const settings = ["Go to Profile", "Dashboard", "Logout"];
const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};

const BookSessionPage: React.FC = async () => {
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
            <Row> 
                <Col xs={{ span: 0}} lg={{ span: 2}}></Col>
                <Col xs={{ span: 24}} lg={{ span: 10}}><MentorBookingCard /></Col>
                <Col xs={{ span: 24}} lg={{ span: 8}}><SessionBookingForm /></Col>
                <Col xs={{ span: 0}} lg={{ span: 4}}></Col>
            </Row>
        </PageContainer>
      </div>
    </>
  );
};

export default BookSessionPage;
