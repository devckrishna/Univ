"use client";
import React, { useState } from "react";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  message,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
// import { useSelector, useDispatch } from 'react-redux';
// import { setcredentials } from "../slices/AuthSlice";
// import { setuniversityvalue } from "../slices/UnivSlice";
// import { useNavigate } from "react-router-dom";

const { Option } = Select;

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

const MRegister: React.FC = () => {
  let [formstate, setformstate] = useState(inivals);
  let [fileList, setFileList] = useState([]);
  const router = useRouter();
  //   const auth = useSelector((state: any) => state.auth);
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onGenderChange = (value: string) => {
    console.log("current gender value is : ", value);
  };

  function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleSubmit = async (values: any) => {
    await setformstate(values);
    console.log("formstate values are :", formstate);
    console.log("image is : ", values.image);
    console.log("gender is :", typeof values.gender, " ", values.gender);

    const res = await fetch("http://localhost:3000/api/v1/mentor/register", {
      method: "POST",
      body: JSON.stringify({
        name: formstate.name,
        email: formstate.email,
        password: formstate.password,
        image: values.image,
        description: formstate.description,
        gender: values.gender,
        university: formstate.university,
        country: formstate.country,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("data got is :", data);
    // dispatch(setcredentials({ type: "Mentor", credentials: data }));
    // console.log("current state is : ", auth);
    router.push(`/mentor/${data._id}`);
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
      >
        <Row style={{ width: "100%" }}>
          <Col span={12}>
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
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input name="email" onChange={handleChange} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password name="password" onChange={handleChange} />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
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
              <Input name="country" onChange={handleChange} />
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
            {/* {window.innerWidth < 992 && <Form.Item
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
            } */}
            {/* {window.innerWidth < 992 && <Form.Item name="image" label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload
                // action={null}
                beforeUpload={() => { return false; }}
                listType="picture"
                fileList={fileList}
                maxCount={1}
                multiple
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            }
            {window.innerWidth < 992 && <Form.Item {...tailFormItemLayout}>
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
                  message: "Please input Intro",
                },
              ]}
            >
              <Input.TextArea
                name="description"
                onChange={handleChange}
                showCount
                maxLength={300}
              />
            </Form.Item>
            <Form.Item
              name="images"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                // action={null}
                beforeUpload={() => {
                  return false;
                }}
                listType="picture-card"
                fileList={fileList}
                maxCount={1}
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
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default MRegister;
