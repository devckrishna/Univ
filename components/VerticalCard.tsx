import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import Link from 'next/link';
import { Button } from 'antd';
import img8 from '../public/img8.jpg'
// import { Card } from 'antd';
// const { Meta } = Card;
const Verticalcard:  React.FC = () => {
    // const backgroundImageUrl = `${process.env.PUBLIC_URL}/img8.jpg`;
    return (
        <>
            <ProCard split="horizontal" bordered={true}>
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
            </ProCard>
            {/* <Card
                hoverable
                style={{width: '100%'}}
                cover={<img alt="example" src={backgroundImageUrl} style={{height:'60%',width:'60%'}} />}
            >
                <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card> */}
        </>
    )
}

export default Verticalcard;