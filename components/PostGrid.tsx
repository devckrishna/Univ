'use client'
import React from "react";
import {Row,Col,Divider} from "antd";
import Sidecard from "./SideCard";
import Verticalcard from "./VerticalCard";
import QueueAnim from "rc-queue-anim";

type PostSchema = {
    id:string;
    title:string;
    images:string[];
    description:string;
    created_at:Date,
    university_name:string
}

type Props = {
    posts:PostSchema[]
}

export default function PostsGrid(posts:Props){
    const postArr = posts.posts;

    return (
        <>
            {/* <div style={{ marginLeft: "3%", marginRight: '3%', marginBottom:'3%'}}>
                        <div key={'recent_blogs'}  className="my-6">
                            <Divider orientation="center">
                            <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight first:mt-0">Most Recent Blogs</h2>
                            </Divider>
                        </div>

                        <Row gutter={[48, 48]}>
                                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                                    <Row gutter={[0,8]}>
                                        <Col key='0' xs={{span:24}} ><Sidecard key='0' post={postArr[0]} /></Col> 
                                        <Col key='1' xs={{span:24}} ><Sidecard key='1' post={postArr[0]} /></Col> 
                                    </Row>  
                                </Col>
                            
                                <Col key='2' xs={{ span: 24 }} lg={{ span: 12 }}>
                                    <Sidecard key='2' post={postArr[0]} />
                                </Col>
                        </Row>
            </div> */}

            {posts.posts.length>3 && 
                <>
                    <div style={{ marginLeft: "3%", marginRight: '3%', marginBottom:'3%'}}>

                                <div key={'recent_blogs'} className="my-6">
                                    <Divider orientation="center">
                                        <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight first:mt-0">Most Recent Blogs</h2>
                                    </Divider>
                                </div>

                                <Row key='r1' gutter={[48, 48]}>
                                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                                        <Row gutter={[0,8]}>
                                            <Col key='0' xs={{span:24}} ><Sidecard key={postArr[0].id} post={postArr[0]} /></Col> 
                                            <Col key='1' xs={{span:24}} ><Sidecard key={postArr[1].id} post={postArr[1]} /></Col> 
                                        </Row>  
                                    </Col>

                                    <Col key='2' xs={{ span: 24 }} lg={{ span: 12 }}>
                                        <Sidecard key={postArr[2].id} post={postArr[2]} />
                                    </Col>
                                </Row>
                    </div>

                    <div style={{ marginLeft: "3%", marginRight: '3%', marginBottom:'3%'}}>
                        <QueueAnim className="all_posts_listing" key="header_allpost" type="bottom">
                            <div key={'all_blogs'} className="my-6">
                                <Divider orientation="center">
                                    <h2 key={'head2'} className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight first:mt-0">All Posts</h2>
                                </Divider>
                            </div>
                            <div key={'all_blog_list'}>
                                <Row key='r2' gutter={[48, 48]}>
                                    {postArr.slice(3).map((p)=>
                                            <Col key={p.id} xs={{ span: 24 }} lg={{ span: 8 }}>
                                                <Verticalcard key={p.id} post={p}/>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </div>
                        </QueueAnim>           
                    </div>
                </>
            }

            {posts.posts.length<3 &&  
            <>
                <div style={{ marginLeft: "3%", marginRight: '3%', marginBottom:'3%'}}>
                    <QueueAnim className="all_posts_listing" key="header_allpost" type="bottom">
                            <div key={'all_blogs'} className="my-6">
                                <Divider orientation="center">
                                    <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight first:mt-0">All Posts</h2>
                                </Divider>
                            </div>
                            <div key={'all_blog_list'}>
                                <Row key='r1' gutter={[48, 48]}>
                                {posts.posts.map((p)=>
                                        <Col key={p.id} xs={{ span: 24 }} lg={{ span: 8 }}>
                                            <Verticalcard key={p.id} post={p}/>
                                        </Col>
                                    )
                                }
                                </Row> 
                            </div>
                    </QueueAnim>     
                </div>
            </>
            }

        </>
      )
}

