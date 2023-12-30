import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
// import { ProCard } from '@ant-design/pro-components';
// import Link from 'next/link';
// import { Button } from 'antd';
import img8 from '../public/img8.jpg'
// import { Card } from 'antd';
// const { Meta } = Card;

const Verticalcard:  React.FC = () => {
    // const backgroundImageUrl = `${process.env.PUBLIC_URL}/img8.jpg`;
    return (
        <>
            <Card orientation="vertical" size="md" variant="outlined">
                <AspectRatio minHeight="120px" maxHeight="200px">
                    <img
                    src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                    srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                    loading="lazy"
                    alt=""
                    />
                </AspectRatio>
                <CardContent orientation="horizontal">
                    <div>
                        <Typography level="title-lg">Yosemite National Park</Typography>
                        <Typography level="body-sm" sx={{fontWeight: 500, marginBottom: '8px'}}>Author: Harvard University</Typography>
                        <Typography level="body-sm">Yosemite National Park is in California's Sierra Nevada here mountains. Ad occaecat officia pariatur fugiat non Lorem sit pariatur consequat nisi.</Typography>
                    </div>
                </CardContent>
                <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    aria-label="Explore Bahamas Islands"
                    sx={{ fontWeight: 600 }}
                    >
                    Read Complete Post
                </Button>
            </Card>
            {/* <ProCard split="horizontal" bordered={true}>
                        <ProCard colSpan="50%">
                            <img src={img8.src} style={{height:'100%',width:'100%'}} />
                        </ProCard>
                        <ProCard headerBordered>
                            <h3>Title of the card</h3>
                            <div>Ut veniam cillum minim eu dolore fugiat non sit consequat nisi ad nisi. Tempor consequat cillum adipisicing ea cillum commodo.</div>
                            <Button type="primary" block >
                                <Link href={"/university"}>Read complete Article</Link>
                            </Button>
                        </ProCard>
            </ProCard> */}
        </>
    )
}

export default Verticalcard;