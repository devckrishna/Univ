'use client';
import React, { useState } from "react";
import { AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select, Upload, message } from 'antd';
import { UploadOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
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

function SRegister() {
  const [formstate, setformstate] = useState<FormState>(inivals);
  const [fileList, setFileList] = useState<any[]>([]);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
    const router = useRouter();
    const [form] = Form.useForm();

  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({
          note: 'Hi, man!',
        });
        break;
      case 'female':
        form.setFieldsValue({
          note: 'Hi, lady!',
        });
        break;
      case 'other':
        form.setFieldsValue({
          note: 'Hi there!',
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

  const handleSubmit = async () => {
    // e.preventDefault();
    // const res = await fetch('/api/v1/univ/register',{
    //     method:'POST',
    //     body:JSON.stringify({
    //         name:formstate.name,
    //         email:formstate.email,
    //         password:formstate.password,
    //         images:formstate.images,
    //         description:formstate.description,
    //         bachelor_courses:formstate.bachelor_courses,
    //         masters_courses:formstate.masters_courses,
    //         address:formstate.address,
    //         website:formstate.website
    //     }),
    //     headers: {
    //         'Content-Type': 'application/json',
    //       }
    // });
    // const data = await res.json();
    // dispatch(setuniversityvalue({email:formstate.email,university_name:formstate.name}));
    router.push("/dashboard");
  }

  const handleChange = (evt: any) => {
    const { name, value } = evt.target;
    setformstate({ ...formstate, [name]: value });
  }

  const onFinish = (values: FormState) => {
    console.log('Received values of form: ', values);
    setformstate(values);
    handleSubmit();
  };

  return (
    <>
      <Form {...formItemLayout} form={form} name="register" onFinish={onFinish}
        style={{
          width: '100%'
        }}
        scrollToFirstError>
        <Row style={{ width: '100%' }}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Please input the Name!',
                  whitespace: true,
                },
              ]}
            >
              <Input name="name" onChange={handleChange} />
            </Form.Item>
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
            <Form.Item name="gender" label="Gender"
              rules={[
                {
                  required: true,
                },
              ]}>
              <Select placeholder="Select a option and change input text above" onChange={onGenderChange} allowClear>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item name="country" label="Country"
              rules={[
                {
                  required: true,
                  message: 'Please select your Country!',
                },
              ]}
            >
              <Input name="country" onChange={handleChange} />
            </Form.Item>
            {window.innerWidth < 992 && <Form.Item
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
            {/* {window.innerWidth < 992 && <Form.Item name="image" label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload
                action={null}
                beforeUpload={() => { return false; }}
                listType="picture"
                fileList={fileList}
                maxCount={1}
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
                  message: 'Please input Intro',
                },
              ]}
            >
              <Input.TextArea name="description" onChange={handleChange} showCount maxLength={300} />
            </Form.Item>
            <Form.Item name="image" label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload
                // action={null}
                beforeUpload={() => { return false; }}
                listType="picture"
                fileList={fileList}
                maxCount={3}
              >
                <Button icon={<UploadOutlined />}>Upload </Button>
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

export default SRegister;


