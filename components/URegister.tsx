"use client";
import React, { useState } from "react";
import {AutoComplete,Button,Cascader,Checkbox,Col,Form,Input,InputNumber,Row,Select,Upload,message} from 'antd';
import { UploadOutlined ,PlusOutlined,LoadingOutlined } from '@ant-design/icons';
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
// import { useSelector, useDispatch } from 'react-redux';
// import { setcredentials } from "../slices/AuthSlice";
  
  
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

const URegister:  React.FC = () => {
    let [formstate,setformstate] = useState(inivals);
    let [fileList,setFileList] = useState([]);
    const router = useRouter();
    // const auth = useSelector((state)=>state.auth);
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [form] = Form.useForm();
    
    // function getBase64(img, callback) {
    //     const reader = new FileReader();
    //     reader.addEventListener("load", () => callback(reader.result));
    //     reader.readAsDataURL(img);
    //   }

    const handleSubmit = async() => {
        // e.preventDefault();
        console.log(formstate.images);
        const res = await fetch('http://localhost:3000/api/v1/univ/register',{
            method:'POST',
            body:JSON.stringify({
                name:formstate.name,
                email:formstate.email,
                password:formstate.password,
                images:formstate.images,
                description:formstate.description,
                bachelor_courses:formstate.bachelor_courses,
                masters_courses:formstate.masters_courses,
                address:formstate.address,
                website:formstate.website
            }),
            headers: {
                'Content-Type': 'application/json',
              }
        });
        const data = await res.json();
        console.log("data got is :", data);
        // dispatch(setcredentials({type:"University",credentials:data}));
        router.push(`/dashboard/${data._id}`);
    }

    const handleChange = (evt:any) =>{
        // console.log(evt.target);
        const { name, value } = evt.target;
        // console.log(name + "  " + value);
        setformstate({...formstate,[name]: value});
    }

    // const handleFileChange = async (info) => {
    //     // console.log(info.file.status)
    //     if (info.file.status !== "uploading") {
    //         var x = info.file;
    //         // console.log('file is : ',x);
    //         let arr = fileList;
    //         // console.log(arr);
    //         arr.push(x);
    //         // console.log("new arr",arr);
    //         await setFileList(arr);
    //         let newform = formstate;
    //         newform.images = arr;
    //         await setformstate(newform);
           
    //       }
    // }

    const onFinish = (values:any) => {
        console.log('Received values of form: ', values);
        setformstate(values);
        console.log('formstate values are :',formstate);
        handleSubmit();
    };

    return (
        <>
            <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} 
                style={{
                    width:'100%'
                }}
                scrollToFirstError>
                <Row style={{
                    width:'100%'
                }}>
                    <Col span={12}>
                        <Form.Item name="email" label="E-mail"
                            rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                            ]}
                        >
                            <Input name="email" onChange={handleChange} />
                        </Form.Item>

                        <Form.Item name="password" label="Password"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            ]}
                            hasFeedback
                        >
                            <Input.Password name="password" onChange={handleChange} />
                        </Form.Item>

                        <Form.Item name="confirm" label="Confirm Password" dependencies={['password']} hasFeedback
                            rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

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

                        {/* {window.innerWidth<992 && <Form.Item
                                                        name="description"
                                                        label="Description"
                                                        rules={[
                                                        {
                                                            message: 'Please input Intro',
                                                        },
                                                        ]}
                                                    >
                                                        <Input.TextArea name="description" onChange={handleChange} showCount maxLength={300} />
                                                  </Form.Item>
                        }
                        {window.innerWidth<992 && <Form.Item name="images" label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                                                        <Upload
                                                            // action={null}
                                                            beforeUpload={()=>{return false;}}
                                                            listType="picture"
                                                            fileList={fileList}
                                                            maxCount={3}
                                                            // onChange={handleFileChange}
                                                            multiple
                                                            >
                                                            <Button icon={<UploadOutlined />}>Upload </Button>
                                                        </Upload>
                                                    </Form.Item>
                        }
                        {window.innerWidth<992 && <Form.Item {...tailFormItemLayout}>
                                                        <Button type="primary" htmlType="submit">Register</Button>
                                                    </Form.Item>
                        } */}
                </Col>
                 <Col span={8}>
                                                    <Form.Item
                                                        name="description"
                                                        label="Description"
                                                        rules={[
                                                        {
                                                            message: 'Please input Intro',
                                                        },
                                                        ]}
                                                    >
                                                        <Input.TextArea name="description" onChange={handleChange} showCount maxLength={300} />
                                                  </Form.Item>
                                                    <Form.Item name="images" label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                                                        <Upload
                                                            // action={null}
                                                            beforeUpload={()=>{return false;}}
                                                            listType="picture-card"
                                                            fileList={fileList}
                                                            maxCount={3}
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
                                                    <Button type="primary" htmlType="submit">Register</Button>
                                                </Form.Item>
                                        </Col>
                
                </Row>
            </Form>
        </>
    )
}

export default URegister;