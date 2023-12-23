'use client'
import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import SvgIcon from '@mui/joy/SvgIcon';
import Sheet from '@mui/joy/Sheet';
import AspectRatio from '@mui/joy/AspectRatio';
import { Rating } from '@mui/material';
import TabScrollButton from '@mui/material/TabScrollButton'
import Tabs from '@mui/material/Tabs';

const data = [
  {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    stars: 4,
    description: 'Session went really well. Got all my doubts cleared and she traced out all the mistakes in resume and gave the best practices to improvise my resume . Definitely recommended .',
  },
  {
    src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
    title: 'Lake view',
    stars: 4,
    description: 'Session went really well. Got all my doubts cleared and she traced out all the mistakes in resume and gave the best practices to improvise my resume . Definitely recommended .',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    stars: 4,
    description: 'Session went really well. Got all my doubts cleared and she traced out all the mistakes in resume and gave the best practices to improvise my resume . Definitely recommended .',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    stars: 4,
    description: 'Session went really well. Got all my doubts cleared and she traced out all the mistakes in resume and gave the best practices to improvise my resume . Definitely recommended .',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    stars: 4,
    description: 'Session went really well. Got all my doubts cleared and she traced out all the mistakes in resume and gave the best practices to improvise my resume . Definitely recommended .',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    stars: 4,
    description: 'Session went really well. Got all my doubts cleared and she traced out all the mistakes in resume and gave the best practices to improvise my resume . Definitely recommended .',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    stars: 4,
    description: 'Khushboo was very helpful and shared a lot of insights in a short span of time in a structured fashion. She was sweet and courteous as well.',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    stars: 4,
    description: 'Khushboo was very helpful and shared a lot of insights in a short span of time in a structured fashion. She was sweet and courteous as well.',
  },
];

const MentorBookingCard:  React.FC = () =>  {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
        <>
            <Card
                sx={{
                    width: '90%',
                    // maxWidth: '100%',
                    boxShadow: 'lg',
                }}
                >
                <CardOverflow variant="solid" sx={{ alignItems: 'center', textAlign: 'center', paddingTop:'6px', paddingBottom:'6px', backgroundColor:'background-color:rgba(48, 88, 137, 0.2)' }}>
                    <Avatar src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg" sx={{ '--Avatar-size': '6rem' }} />
                    <Chip
                    size="sm"
                    variant="soft"
                    color="primary"
                    sx={{
                        mt: -1,
                        mb: 1,
                        border: '3px solid',
                        borderColor: 'background.surface',
                    }}
                    >
                    4.5 / 5
                    </Chip>
                    <Typography level="title-lg">Josephine Blanton</Typography>
                </CardOverflow>

                <CardOverflow variant="soft" sx={{backgroundColor:'white'}}>
                    {/* <Divider inset="context" /> */}
                    <CardContent orientation="horizontal">
                        <div style={{width:'40%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <Chip
                                variant="outlined"
                                color="primary"
                                size="sm"
                                sx={{ pointerEvents: 'none', marginRight:'40px' }}
                                >
                                Hourly Rate : Rs 700
                            </Chip>
                        </div>
                        <Divider orientation="vertical" />
                        <div style={{width:'60%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <Typography level="title-lg">Harvard University</Typography>
                        </div>
                        <Divider />
                    </CardContent>
                </CardOverflow>
                
                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                    <Typography level="body-sm">
                        Hello, this is my bio and I am a PRO member of MUI. I am a developer and I
                        love to code. Nostrud minim occaecat culpa veniam nostrud. Adipisicing sit ex in eu ullamco et cillum eu.Anim ipsum occaecat reprehenderit voluptate. Quis eiusmod elit non incididunt consectetur aliqua aliqua excepteur tempor do in voluptate laboris. Id ut eiusmod eiusmod esse aliqua enim sunt eiusmod laboris ea incididunt tempor excepteur laborum.
                    </Typography>
                </CardContent>

                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                    <Typography level="h3">Testimonials</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            py: 1,
                            overflow: 'auto',
                            width: '100%',
                            // height:400,
                            scrollSnapType: 'x mandatory',
                            '& > *': {
                            scrollSnapAlign: 'center',
                            },
                            '::-webkit-scrollbar': { display: 'none' },
                        }}
                        >

                            {data.map((item) => (

                                <Card size="sm" key={item.title} variant="outlined" sx={{maxWidth:250}} >
                                    {/* <AspectRatio sx={{ minWidth: 60 }}> */}
                                    {/* <Avatar
                                        // srcSet={`${item.src}?h=120&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${item.src}?h=120&fit=crop&auto=format`}
                                        alt={item.title}
                                    /> */}
                                    {/* </AspectRatio> */}
                                    <Box sx={{ whiteSpace: 'nowrap', mx: 1 }}>
                                      <Typography level="title-md">{item.title}</Typography>
                                      <Rating name="read-only" value={item.stars} readOnly />
                                    </Box>
                                    <CardContent>
                                      <Typography>{item.description.length>100?item.description.substr(0,100)+'...':item.description}</Typography>
                                    </CardContent>
                                </Card>
                                // <Card
                                //     // sx={{
                                //     // width: 300,
                                //     // maxWidth: '100%',
                                //     // boxShadow: 'lg',
                                //     // }}
                                // >
                                //     <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                //         <Avatar src={`${item.src}?h=120&fit=crop&auto=format`} sx={{ '--Avatar-size': '4rem' }} />
                                //         <Typography level="title-lg">{item.title}</Typography>
                                //         <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>{item.description.length>200 ?item.description.substr(0,200) + '...': item.description }</Typography>
                                //     </CardContent>

                                
                                // </Card>
                            ))}
                            
                    </Box>
                </CardContent>
                
                {/* <CardOverflow sx={{ bgcolor: 'background.level1' }}>
                    <CardActions buttonFlex="1">
                    <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
                        <Button>Message</Button>
                        <Button>Connect</Button>
                    </ButtonGroup>
                    </CardActions>
                </CardOverflow> */}
            </Card>
        </>
    )
}

export default MentorBookingCard;