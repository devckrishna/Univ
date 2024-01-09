"use client";
import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { reset,setcredentials } from "@/redux/features/AuthSlice";

const inivals = {
  name:"",
  email:"",
  password:""
}

const ULogin:  React.FC = () =>{
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

    let [formstate,setformstate] = useState(inivals);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const currstate = useAppSelector((state) => state);
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    const loginHandler = async() =>{

      console.log(formstate);
      const res = await fetch('http://localhost:3000/api/university/login', {
          method: 'POST',
          body: JSON.stringify({
            email: formstate.email ,
            password:formstate.password,
            // name:formstate.name
          }),
          headers: {
          'Content-Type': 'application/json',
          },
      });
  
      const data = await res.json();
      console.log("data from database is : ",data);
      if(data.data){
          dispatch(reset());
          const new_univ = {
              credentials:data.data,
              type:'university'
          }
          console.log("print new univ",new_univ);
          dispatch(setcredentials(new_univ));
          console.log("curr authslice state is : ",currstate);
          router.push(`/dashboard`);
      }else {
        router.push('/');
      }

    }

    const handleChange = (evt:any) =>{
        const { name, value } = evt.target;
        // console.log(name + "  " + value);
        setformstate({...formstate,[name]: value});
    }

    const onFinish = (values:any) => {
        console.log('Received values of form: ', values);
        loginHandler();
    };

    useEffect(()=>{
      if(currstate.auth.credentials)router.push(`/university/${currstate.auth.credentials.id}`);
    });

    return (
        <>
            <Form {...formItemLayout} name="normal_login" className="login-form"
                onFinish={onFinish}
                >
                {/* <Form.Item name="name"
                    rules={[
                      {
                          required: true,
                          message: 'Please input your University Name!',
                      },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} name="name" placeholder="University Name" onChange={handleChange} />
                </Form.Item> */}

                <Form.Item name="email"
                    rules={[
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                          required: true,
                          message: 'Please input your Email ID!',
                      },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} name="email" placeholder="Email ID" onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Log in
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default ULogin;