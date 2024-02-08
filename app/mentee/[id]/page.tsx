'use client';
import React, { useEffect } from "react";
import {Row,Col,Space,Card,ConfigProvider,Dropdown,Input,Popover,theme,Descriptions,Flex,Avatar,Image,Carousel } from 'antd';
import { PageContainer,ProCard,ProConfigProvider,ProLayout,SettingDrawer,StatisticCard } from '@ant-design/pro-components';
import { RotateLeftOutlined,
    RotateRightOutlined,
    SwapOutlined,
    ZoomInOutlined,
    ZoomOutOutlined } from '@ant-design/icons';
import RcResizeObserver from 'rc-resize-observer';
import Link from "next/link";
import { Divider,Stack,Paper,AppBar,Box,Toolbar,IconButton,Typography,Menu,Container,Tooltip,MenuItem  } from '@mui/material';
import Bookings from "@/components/Bookings";
import Feedbacks from "@/components/Feedbacks";
import axios from "axios";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";

const { Statistic } = StatisticCard;
const settings = ['Go to Profile','Dashboard', 'Logout'];
const items = [
    {
      key: '1',
      label: 'Name',
      children: 'Cloud Database',
      span:3
    },
    {
      key: '2',
      label: 'Email',
      children: 'Prepaid',
      span:3
    },
    {
      key: '3',
      label: 'Country',
      children: 'YES',
      span:3
    },
    {
      key: '4',
      label: 'University',
      children: '2018-04-24 18:00:00',
      span:3
    },
    {
      key: '5',
      label: 'Gender',
      children: '2019-04-24 18:00:00',
      span: 3,
    },
  ];
  type MenteeObj = {
    id: string;
    country: string;
    description: string;
    email: string;
    gender: string;
    image: string;
    name: string;
  };
  const contentStyle = {
    height: '260px',
    color: '#fff',
    lineHeight: '260px',
    textAlign: 'center',
    background: '#364d79',
  };
const StudentProfile = ({ params }: { params: { id: string } }) =>{
    const [responsive, setResponsive] = React.useState(false);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [menteeDetails, setMenteeDetails]  = React.useState<MenteeObj>({
      id: "",
      country: "",
      description: "",
      email: "",
      gender: "",
      image: "",
      name: ""
    });
    const handleOpenNavMenu = (event:any) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event:any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const getdetails = async() => {
      console.log("hehehhe");
      const data = await axios.get("/api/student/"+params.id);
      console.log(data.data);
      setMenteeDetails(data.data);
      console.log("mentee details ",menteeDetails);
      setIsLoading(false);
    }
    
    useEffect(()=>{
      getdetails();
      console.log("current mentor details are",menteeDetails);
    },[])

    if(isLoading){
      return (<Loading />);
    }else{
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
                        display: {md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        UnivConnect
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}> 
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg" />
                        </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
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
                background: '#F5F7FA',
              }}
            >
            <PageContainer >
                  <Row gutter={[48,48]}>
                    
                      <Col xs={{span:24}} lg={{span:10}}>
                        <div style={{backgroundColor:'white',padding:"20px",height:'inherit'}}>
                            <Image 
                            src={menteeDetails.image}
                            preview={{
                                toolbarRender: (
                                  _,
                                  {
                                    transform: { scale },
                                    actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
                                  },
                                ) => (
                                  <Space size={12} className="toolbar-wrapper">
                                    <SwapOutlined rotate={90} onClick={onFlipY} />
                                    <SwapOutlined onClick={onFlipX} />
                                    <RotateLeftOutlined onClick={onRotateLeft} />
                                    <RotateRightOutlined onClick={onRotateRight} />
                                    <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                                    <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                                  </Space>
                                ),
                              }}
                            />
                            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-4">{menteeDetails.name}</h2>
                            <p>{menteeDetails.description}</p>
                            <Divider style={{margin:'15px'}}>
                              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Personal Information</h3>
                            </Divider>
                            <Descriptions bordered items={[
                                                  {
                                                    key: '1',
                                                    label: 'Email',
                                                    children: menteeDetails.email,
                                                    span:3
                                                  },
                                                  {
                                                    key: '2',
                                                    label: 'Country',
                                                    children: menteeDetails.country,
                                                    span:3
                                                  },
                                                  {
                                                    key: '3',
                                                    label: 'gender',
                                                    children: menteeDetails.gender,
                                                    span:3
                                                  }
                                                ]} />
                            <Divider style={{margin:'15px'}}>
                              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Edit Info</h3>
                            </Divider>
                            <Stack spacing={2} direction="column">
                                <Link href='/'>
                                  <Button>Edit Personal Information</Button>
                                </Link>
                                <Link href='/mentee/bookSession'>
                                  <Button>Book A MentorShip Session</Button>
                                </Link>
                            </Stack>
                        </div>
                      </Col>

                      <Col xs={{span:24}} lg={{span:14}}>

                          <Row gutter={[16,16]}>
                            <Col span={24}>
                              <Divider style={{margin:'15px'}}>
                                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Upcoming Sessions</h3>
                              </Divider>
                              <Bookings />
                            </Col>
                          </Row>

                          <Row gutter={[16,16]}>
                            <Col span={24}>
                                <Divider style={{margin:'15px'}}>
                                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Mentor Feedbacks</h3>
                                </Divider>
                                <Feedbacks />
                            </Col>
                          </Row>

                      </Col>
                  </Row>

            </PageContainer>
            </div>


        </>
    );
  }
}

export default StudentProfile;