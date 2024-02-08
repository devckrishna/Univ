"use client"
import React, { useEffect, useState } from "react";
import {Row,Col,Space,Card,ConfigProvider,Dropdown,Input,Popover,theme,Descriptions,DatePicker,Flex,Avatar,Select,Form, Button,} from "antd";
import {PageContainer,ProCard,ProConfigProvider,ProLayout,SettingDrawer,StatisticCard,} from "@ant-design/pro-components";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Divider, Stack, Paper } from "@mui/material";
import Bookings from "@/components/Bookings";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import UpdateSlotForm from "@/components/UpdateSlotForm";

const settings = ["Go to Profile", "Dashboard", "Logout"];

const SlotUpdatePage: React.FC = () => {
  const [responsive, setResponsive] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const currstate = useAppSelector(state => state);
  const router = useRouter();

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

  useEffect(() => {
    // if(currstate.auth.type != 'mentor'){
      // router.push('/');
    // }
  });



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
              <UpdateSlotForm />
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
