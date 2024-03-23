"use client";
import React,{useEffect, useState} from "react";
import {Row,Col,Carousel,} from "antd";
import Loading from "@/components/Loading";
import PostsGrid from "@/components/PostGrid";
import QueueAnim from "rc-queue-anim";

type PostSchema = {
  id:string;
  title:string;
  images:string[];
  description:string;
  created_at:Date,
  university_name:string
}

const Dashboard = () => {
    
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '400px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  const [posts, setPosts] = useState<PostSchema[]>([]);
  const [loading,setLoading] = useState(true);
  // const { userId} = useAuth();

  const fetchPosts = async() => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    console.log(data);
    setPosts(data);
    setLoading(false);
  }


  useEffect(() => {
    fetchPosts();
    console.log("posts are : ",posts);
  }, []);

  const onChange = (currentSlide: number) => {
    
  };


  if(loading){
    return (<Loading />)
  }else {
  return (  
            <>
                  <QueueAnim type={['right', 'left']} delay={700} duration={1200} className="demo-content">
                       {[<div key={'a'}>
                            <Row>
                                <Col span={24}>
                                    <Carousel afterChange={onChange} autoplay={true}>
                                        <div>
                                          <h3 style={contentStyle}>1</h3>
                                        </div>
                                        <div>
                                          <h3 style={contentStyle}>2</h3>
                                        </div>
                                        <div>
                                          <h3 style={contentStyle}>3</h3>
                                        </div>
                                        <div>
                                          <h3 style={contentStyle}>4</h3>
                                        </div>
                                    </Carousel>
                                </Col>
                            </Row>
                      </div>,
                      <div key="all_posts_list">
                        <PostsGrid posts={posts}/>  
                      </div>]}
                  </QueueAnim>
            </>
        );
  }
}

export default Dashboard;
