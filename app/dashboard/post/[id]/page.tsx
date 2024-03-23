'use client'
import { Col, Row } from "antd";
import {InfoCircleFilled,LogoutOutlined} from "@ant-design/icons";
import PostCard from "@/components/Post";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading";


type PostSchema = {
    id:string;
    title:string;
    images:string[];
    description:string;
    created_at:Date,
    university_name:string,
    university_id:string
}

function Post({ params }: { params: { id: string } }){
    const [loading,setLoading] = useState(true);
    const [post,setPost] = useState<PostSchema>({
        id:"",
        title:"",
        images:[],
        description:"",
        created_at:new Date(),
        university_name:"",
        university_id:""
    });

    const [image,setImage] = useState("");

    const getPost = async () => {
        const data = await axios.get('/api/posts/' + params.id);
        console.log('post details',data);
        setPost(data.data.data);

        const university_data = await axios.get("/api/university/" + data.data.data.university_id);
        console.log("university data",university_data);
        setImage(university_data.data.data.images[0]);
        setLoading(false);
    }

    useEffect(()=> {
        getPost();
    },[]);

    if(loading){
        return <Loading />;
    }else{
        return (
            <>
                    <Row style={{padding:'0px !important'}}>
                        <Col xs={{ span: 1 }} lg={{ span: 4 }}></Col>
                        <Col xs={{ span: 22 }} lg={{ span: 16 }} className="p-8 my-4" style={{border:'1px solid rgba(209, 213, 219,1)'}}><PostCard post={post} universityimage={image} /></Col>
                        <Col xs={{ span: 1 }} lg={{ span: 4 }}></Col>
                    </Row>
            </>
        )
    }

}

export default Post;