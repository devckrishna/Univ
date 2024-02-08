'use client'
import {useEffect, useState} from "react";
import {Row,Col,Space,Descriptions,Avatar, Image} from 'antd';
import { PageContainer,StatisticCard } from '@ant-design/pro-components';
import { RotateLeftOutlined,RotateRightOutlined,SwapOutlined,ZoomInOutlined,ZoomOutOutlined } from '@ant-design/icons';
import RcResizeObserver from 'rc-resize-observer';
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
import { Divider,Stack  } from '@mui/material';
import Bookings from "@/components/Bookings";
import Feedbacks from "@/components/Feedbacks";
import Loading from "@/components/Loading";
import axios from "axios";

const { Statistic } = StatisticCard;
const settings = ['Go to Profile','Dashboard', 'Logout'];
type MentorObj = {
  id: string;
  country: string;
  description: string;
  email: string;
  gender: string;
  image: string;
  name: string;
  university: string;
  rating: Number,
  rate: Number
};

const MentorProfile = ({ params }: { params: { id: string } }) => {
  const [responsive, setResponsive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [bookings,setBookings] = useState<string[]>([]);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mentorDetails, setMentorDetails]  = useState<MentorObj>({
    id: "",
    country: "",
    description: "",
    email: "",
    gender: "",
    image: "",
    name: "",
    university: "",
    rating: 0,
    rate:0
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
    const data = await axios.get("/api/mentor/"+params.id);
    console.log(data.data.data);
    setMentorDetails(data.data.data);
    console.log("mentor details ",mentorDetails);
    setIsLoading(false);
  }
  
  const getBookings = async() => {
    const data = await axios.post("/api/mentor/getslots",{
      email:mentorDetails.email
    });
    setBookings(data.data);
  }

  useEffect(()=>{
    getdetails();
    getBookings();
    console.log("current mentor details are",mentorDetails);
  },[])

        if(isLoading){
          return (<Loading />)
        }else{
        return (
            <>
                <AppBar position="static" color="transparent">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                        
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
                                      src={mentorDetails.image}
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
                                      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-4">{mentorDetails.name}</h2>
                                      <p>{mentorDetails.description}</p>
                                      <Divider style={{margin:'15px'}}>
                                          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Personal Information</h3>
                                      </Divider>
                                      <Descriptions bordered items={[
                                                  {
                                                    key: '1',
                                                    label: 'Email',
                                                    children: mentorDetails.email,
                                                    span:3
                                                  },
                                                  {
                                                    key: '2',
                                                    label: 'Country',
                                                    children: mentorDetails.country,
                                                    span:3
                                                  },
                                                  {
                                                    key: '3',
                                                    label: 'gender',
                                                    children: mentorDetails.gender,
                                                    span:3
                                                  },
                                                  {
                                                    key: '4',
                                                    label: 'University',
                                                    children: mentorDetails.university,
                                                    span:3
                                                  },
                                                  {
                                                    key: '5',
                                                    label: 'Rate',
                                                    children: `Rs ${mentorDetails.rate}`,
                                                    span: 3,
                                                  }
                                                ]} />
                                      <Divider style={{margin:'15px'}}>
                                          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Edit Info</h3>
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
                                        <Divider style={{margin:'15px'}}>
                                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Upcoming Sessions</h3>
                                        </Divider>
                                        <Bookings />
                                      </Col>
                                    </Row>
                                    
                                    <Row gutter={[16,16]}>
                                      <Col span={24}>
                                          <Divider style={{margin:'15px'}}>
                                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Student Feedbacks</h3>
                                          </Divider>
                                          <Feedbacks />
                                      </Col>
                                    </Row>

                                </Col>
                            </Row>

                      </PageContainer>
                </div>
            </>
        )
      }
}

export default MentorProfile;