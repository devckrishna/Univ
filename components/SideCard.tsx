import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import Link from 'next/link';
import { Button } from 'antd';
import img8 from '../public/img8.jpg'

const Sidecard:  React.FC = () => {
    // const backgroundImageUrl = `${process.env.PUBLIC_URL}/img8.jpg`;
    return (
        <>
            <ProCard split="vertical">
                        <ProCard colSpan="50%">
                            <img src={img8.src} style={{height:'100%',width:'100%'}} />
                        </ProCard>
                        <ProCard headerBordered>
                            <h3>Title of the card</h3>
                            <div style={{ height:180 }}>Ut veniam cillum minim eu dolore fugiat non sit consequat nisi ad nisi. Tempor consequat cillum adipisicing ea cillum commodo. Veniam esse dolor est fugiat duis esse minim ullamco Lorem laborum.</div>
                            <Button type="primary" block >
                                <Link href={"/university"}>Read complete Article</Link>
                            </Button>
                        </ProCard>
            </ProCard>
        </>
    )
}

export default Sidecard;