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
import {
  UploadOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { country_list } from "./Names";

const { Option } = Select;

// const normFile = (e: any) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

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

let inivals = {
  name: "",
  email: "",
  password: "",
  image: {},
  description: "",
  country: "",
  university: "",
  gender: "",
};

const MRegister = () => {
  let [formstate, setformstate] = useState(inivals);
  let [fileList, setFileList] = useState([]);
  const router = useRouter();
  //   const auth = useSelector((state: any) => state.auth);
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();
  const [form] = Form.useForm();
  const {user} = useUser();

  const onGenderChange = (value: string) => {
    console.log("current gender value is : ", value);
  };

  const handleSubmit = async (values: any) => {

    setformstate(values);
    // console.log("formstate values are :", formstate);
    // console.log("gender is :", typeof values.gender, " ", values.gender);
    const email = user?.emailAddresses[0].emailAddress;
    console.log(email);
    console.log(user);

    const res = await fetch("http://localhost:3000/api/mentor", {
      method: "POST",
      body: JSON.stringify({
        name: values.name,
        email: email,
        image: user?.imageUrl,
        description: values.description,
        gender: values.gender,
        university: values.university,
        country: values.country,
        rate:values.rate
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("data got is :", data);
    // dispatch(setcredentials({ type: "Mentor", credentials: data }));
    // console.log("current state is : ", auth);
    router.push(`/mentor/${data.data.id}`);
  };

  const handleChange = (evt: any) => {
    const { name, value } = evt.target;
    setformstate({ ...formstate, [name]: value });
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
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
                    name="rate"
                    label="Hourly Price (INR)"
                    rules={[
                      {
                        type: "number",
                        min: 0,
                        // message: "The input is not valid price!",
                      },
                      {
                        required: true,
                        message: "Please input your hourly price!",
                      },
                    ]}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item
                    name="university"
                    label="University"
                    rules={[
                      {
                        required: true,
                        message: "Please select your University!",
                      },
                    ]}
                  >
                    <Input name="university" onChange={handleChange} />
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
                    {/* <Input name="country" onChange={handleChange} /> */}
                    <Select
                      placeholder="Select a option"
                      // onChange={onGenderChange}
                      allowClear
                    >
                      {country_list.map((c)=><Option value={c.toString()}>{c}</Option>)}
                    </Select>
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
                      placeholder="Select a option"
                      onChange={onGenderChange}
                      allowClear
                    >
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option>
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
                      maxLength={1000}
                    />
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                    <Button>
                      Register
                    </Button>
                  </Form.Item>
      </Form>
    </>
  );
};

export default MRegister;
