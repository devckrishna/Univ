'use client'
import React,{useState} from "react";
import {Row,Col,Space,Card,ConfigProvider,Dropdown,Input,Popover,theme,Descriptions,Flex,Avatar} from 'antd';
import { PageContainer,ProCard,ProConfigProvider,ProLayout,SettingDrawer,StatisticCard } from '@ant-design/pro-components';
import { CaretDownFilled,DoubleRightOutlined,GithubFilled,InfoCircleFilled,LogoutOutlined,PlusCircleFilled,QuestionCircleFilled,SearchOutlined,AntDesignOutlined } from '@ant-design/icons';
import RcResizeObserver from 'rc-resize-observer';
import Link from "next/link";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Divider,Stack,Paper  } from '@mui/material';
import Bookings from "@/components/Bookings";
import Feedbacks from "@/components/Feedbacks";

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


const MentorProfile:  React.FC = async () => {
  const [responsive, setResponsive] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
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
    return (
        <>
            {/* <ProLayout 
            //   prefixCls="my-prefix"
              token={{
                          // colorBgMenuItemSelected: 'white',
                          // bgLayout: 'white',
                      }}
            //   title="UnivConnect" 
              layout="top" 
              colorBgHeader={"black"}
              avatarProps={{
                                src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                                size: 'small',
                                title: '',
                                render: (props, dom) => {
                                  return (
                                    <Dropdown
                                      menu={{
                                        items: [
                                          {
                                            key:'Go to Profile',
                                            icon:<InfoCircleFilled />,
                                            label: (
                                                <a target="_blank" rel="noopener noreferrer" href="/">
                                                    Profile
                                                </a>
                                                
                                                )
                                          },
                                          {
                                            key: 'logout',
                                            icon: <LogoutOutlined />,
                                            label: (
                                                <Link to={'/'}>
                                                    Logout
                                                </Link>
                                            ),
                                          }
                                        ],
                                      }}
                                    >
                                      {dom}
                                    </Dropdown>
                                  );
                                },
                              }}
            > */}

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
                            <Avatar size={{xs: 24,sm: 32,md: 40,lg: 64,xl: 80,xxl: 100,}} alt="Travis Howard" 
                              src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg" 
                            />
                            <h2>Chirag Jindal</h2>
                            <p> excepteur. Nostrud ea occaecat ad dolore commodo tempor ut pariatur. Veniam Lorem Lorem adipisicing sit occaecat nostrud occaecat ex adipisicing deserunt id anim duis. Eiusmod aliqua minim veniam id ea amet nulla exercitation cupidatat do enim adipisicing incididunt.</p>
                            <Divider>
                                <h2>Personal Information</h2>
                            </Divider>
                            <Descriptions bordered items={items} />
                            <Divider>
                                <h2>Edit Info</h2>
                            </Divider>
                            <Stack spacing={2} direction="column">
                                <Button variant="contained">Edit Personal Information</Button>
                                <Button variant="contained">Update Slots</Button>
                            </Stack>
                            {/* <div>
                                <Avatar
                                        size={{
                                        xs: 24,
                                        sm: 32,
                                        md: 40,
                                        lg: 64,
                                        xl: 80,
                                        xxl: 100,
                                        }}
                                        icon={<AntDesignOutlined />}
                                    />
                                <h2>Chirag Jindal</h2>
                                <p>Consequat dolor duis tempor nulla deserunt ex.Elit esse do ut adipisicing officia. Culpa irure magna qui velit enim non tempor ea. Sit consequat ea culpa culpa non nisi pariatur. Et cillum in sit et aute minim quis voluptate qui commodo dolore velit laborum ex. Cillum deserunt id nisi ut consequat aliqua consectetur voluptate ea qui anim duis veniam.</p>
                                <Divider>Personal Details</Divider>
                                <Descriptions bordered items={items} />
                                <Divider>Edit Profile</Divider>
                                <Flex gap="small" align="center" vertical>
                                  <Button type="primary" shape="round">Edit Personal Details</Button>
                                  <Button type="primary" shape="round">Edit Slots</Button>
                                </Flex>
                            </div> */}
                        </div>
                      </Col>

                      <Col xs={{span:24}} lg={{span:14}}>
                          <Row gutter={[16,16]}>
                            <Col span={24}>
                                {/* <Divider>
                                    <h2>Statistics</h2>
                                </Divider> */}
                                <RcResizeObserver
                                  key="resize-observer"
                                >
                                  <StatisticCard.Group direction={'row'}>
                                    <StatisticCard
                                      statistic={{
                                        title: 'Total Mentorship Hrs',
                                        value: 100,
                                      }}
                                    />
                                    <Divider orientation="vertical" flexItem></Divider>
                                    <StatisticCard
                                      statistic={{
                                        title: 'Mentor Rating',
                                        value: 4,
                                        // description: <Statistic title="Rating" value="61.5%" />,
                                      }}
                                    />
                                    <Divider orientation="vertical" flexItem></Divider>
                                    <StatisticCard
                                      statistic={{
                                        title: 'Total Sessions Takes',
                                        value: 50,
                                        // description: <Statistic title="Sessions" value="" />,
                                      }}
                                    />
                                  </StatisticCard.Group>
                                </RcResizeObserver>
                            </Col>
                          </Row>

                          <Row gutter={[16,16]}>
                            <Col span={24}>
                              <Divider>
                                  <h2>Upcoming Sessions</h2>
                              </Divider>
                              <Bookings />
                            </Col>
                          </Row>
                          
                          <Row gutter={[16,16]}>
                            <Col span={24}>
                                <Divider>
                                  <h2>Student Feedbacks</h2>
                                </Divider>
                                <Feedbacks />
                            </Col>
                          </Row>

                      </Col>
                  </Row>

            </PageContainer>
            </div>

            {/* </ProLayout> */}
        </>
    )
}

export default MentorProfile;