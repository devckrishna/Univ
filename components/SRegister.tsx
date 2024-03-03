"use client";
import React, { useState } from "react";
import {
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { country_list } from "./Names";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux'

const { Option } = Select;

interface FormState {
  name: string;
  email: string;
  password: string;
  image: any;
  description: string;
  country: string;
  gender: string;
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};

const inivals: FormState = {
  name: "",
  email: "",
  password: "",
  image: {},
  description: "",
  country: "",
  gender: "",
};

const SRegister = () => {
  const [formstate, setformstate] = useState<FormState>(inivals);
  const [fileList, setFileList] = useState<any[]>([]);
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const {user} = useUser();

  const onGenderChange = (value: string) => {
    switch (value) {
      case "male":
        form.setFieldsValue({
          note: "Hi, man!",
        });
        break;
      case "female":
        form.setFieldsValue({
          note: "Hi, lady!",
        });
        break;
      case "other":
        form.setFieldsValue({
          note: "Hi there!",
        });
        break;
      default:
    }
  };

  function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleSubmit = async (values:any) => {
    
        const email = user?.emailAddresses[0].emailAddress;
        console.log(email);
        if(user) console.log(user.imageUrl);
        console.log("here",values);
        const res = await fetch("http://localhost:3000/api/student", {
          method:'POST',
          body:JSON.stringify({
              name:values.name,
              email:email,
              image: user?.imageUrl,
              description:values.description,
              gender: values.gender,
              country: values.country,
          }),
          headers: {
              'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        console.log("data got is :", data);
    // dispatch(setuniversityvalue({email:formstate.email,university_name:formstate.name}));
        router.push(`/mentee/${data.data.id}`);
  };

  const handleChange = (evt: any) => {
    const { name, value } = evt.target;
    setformstate({ ...formstate, [name]: value });
  };

  const onFinish = (values: FormState) => {
    console.log("Received values of form: ", values);
    setformstate(values);
    handleSubmit(values);
  };

  return (
    <>
      <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          style={{
            width: "100%",
          }}
          scrollToFirstError
          layout="vertical"
        >
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please input the Name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input name="name" onChange={handleChange} />
              </Form.Item>
              
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Select a option and change input text above"
                  onChange={onGenderChange}
                  allowClear
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="country"
                label="Country"
                rules={[
                  {
                    required: true,
                    message: "Please select your Country!",
                  },
                ]}
              >
                <Select
                      placeholder="Select a option"
                      // onChange={onGenderChange}
                      allowClear
                    >
                      {country_list.map((c)=><Option value={c.toString()}>{c}</Option>)}
                </Select>
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    message: "Please input Intro",
                  },
                ]}
              >
                  <Input.TextArea
                    name="description"
                    onChange={handleChange}
                    showCount
                    maxLength={500}
                  />
              </Form.Item>
              
              <Form.Item {...tailFormItemLayout}>
                <Button>Register</Button>
              </Form.Item>
      </Form>
    </>
  );
}

export default SRegister;
