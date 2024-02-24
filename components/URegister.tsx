"use client";
import React, { useEffect, useState } from "react";
import {Form,Input,Select,Upload} from 'antd';
import { UploadOutlined ,PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
  
  const { Option } = Select;
  const normFile = (e:any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const formItemLayout = {
    labelCol: {
      xs: {span: 24,},
      sm: {span: 8,},
    },
    wrapperCol: {
      xs: {span: 24,},
      sm: {span: 16,},
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {span: 24,offset: 0,},
      sm: {span: 16,offset: 8,},
    },
  };

  let inivals = {
    name:"",
    email:"",
    password:"",
    images:[],
    description:"",
    bachelor_courses:"",
    masters_courses:"",
    address:"",
    website:""
  }

const URegister = () => {
    let [formstate,setformstate] = useState(inivals);
    let [fileList,setFileList] = useState([]);
    const router = useRouter();
    const [form] = Form.useForm();
    const {user} = useUser();
    
    const imageUpload = async(file:any) => {
        const formData = new FormData();
        formData.append('file',file);
        formData.append('upload_preset','uni_connect_assets');
        const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL || "";
        console.log(process.env.NEXT_PUBLIC_CLOUDINARY_URL);
        const image = await fetch(url,{
                method: 'POST',
                body: formData,
            }).then(r => r.json());
        return image.secure_url;
    }


    const handleSubmit = async(values:any) => {
        
       
        let arr = [];
        for(let i=0;i<values.images.length;i++){
            let url = await imageUpload(values.images[i].originFileObj);
            arr.push(url);
        }
        arr.push(user?.imageUrl);
        console.log('images are : ', arr);
        const email = user?.emailAddresses[0].emailAddress;
        console.log(email);
        const res = await fetch('http://localhost:3000/api/university',{
            method:'POST',
            body:JSON.stringify({
                    name:values.name,
                    email:email,
                    images:arr,
                    description:values.description,
                    bachelor_courses:values.bachelor_courses,
                    masters_courses:values.masters_courses,
                    address:values.address,
                    website:values.website
                }),
            headers: {
                'Content-Type': 'application/json',
              }
        });

        const data = await res.json();
        console.log("data from database is : ",data);
        
        router.push(`/university/${data.data.id}`);
    }

    const handleChange = (evt:any) =>{
        // console.log(evt.target);
        const { name, value } = evt.target;
        // console.log(name + "  " + value);
        setformstate({...formstate,[name]: value});
    }

    const onFinish = (values:any) => {
        console.log('Received values of form: ', values);
        setformstate(values);
        console.log('formstate values are :',formstate);
        handleSubmit(values);
    };

    return (
        <>
            <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} 
                style={{
                    width:'100%'
                }}
                scrollToFirstError
                layout="vertical"
                >
                
                        <Form.Item
                            name="name"
                            label="University Name"
                            rules={[
                            {
                                required: true,
                                message: 'Please input the University Name!',
                                whitespace: true,
                            },
                            ]}
                        >
                            <Input name="name" onChange={handleChange} />
                        </Form.Item>

                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[
                            {
                                required: true,
                                message: 'Please select your Address!',
                            },
                            ]}
                        >
                            <Input name="address" onChange={handleChange} />
                        </Form.Item>

                        <Form.Item
                            name="bachelor_courses"
                            label="Bachelor Courses"
                            rules={[
                            {
                                required: true,
                                message: 'Please select your Bachelor Courses!',
                            },
                            ]}
                        >
                            <Input name="bachelor_courses" onChange={handleChange} />
                        </Form.Item>

                        <Form.Item
                            name="masters_courses"
                            label="Masters Courses"
                            rules={[
                            {
                                required: true,
                                message: 'Please select your Masters Courses!',
                            },
                            ]}
                        >
                            <Input name="masters_courses" onChange={handleChange} />
                        </Form.Item>

                        <Form.Item
                            name="website"
                            label="Website"
                            rules={[
                            {
                                required: true,
                                message: 'Please input website!',
                            },
                            ]}
                        >
                            {/* <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website"> */}
                            <Input name="website" onChange={handleChange} />
                            {/* </AutoComplete> */}
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                            {
                                message: 'Please input Intro',
                            },
                            ]}
                        >
                            <Input.TextArea name="description" onChange={handleChange} showCount maxLength={500} />
                      </Form.Item>
                      <Form.Item name="images" label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                          <Upload
                              // action={null}
                              beforeUpload={()=>{return false;}}
                              listType="picture-card"
                              fileList={fileList}
                              maxCount={3}
                              name="file"
                              // onChange={handleFileChange}
                              multiple
                              >
                              <div>
                                  <PlusOutlined />
                                  <div style={{ marginTop: 8 }}>Upload</div>
                              </div>
                          </Upload>
                      </Form.Item>

                      <Form.Item {...tailFormItemLayout}>
                          <Button>Register</Button>
                      </Form.Item>
                
            </Form>
        </>
    )
}

export default URegister;