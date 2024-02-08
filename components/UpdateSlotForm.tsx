"use client";
import React, { useEffect, useState } from "react";
import {AutoComplete,Button,Cascader,Checkbox,Col,DatePicker,Form,Input,InputNumber,Row,Select,Upload,message} from 'antd';
import { useRouter } from "next/navigation";
import { reset,setcredentials } from "@/redux/features/AuthSlice";
import { useAppDispatch,useAppSelector } from "@/redux/hooks";
  
  const { Option } = Select;

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
      xs: { span: 24, offset: 0 },
      sm: { span: 16, offset: 8 },
    },
  };

  let inivals = {
    date:"",
    Duration:"",
    Slot:""
  }

const UpdateSlotForm:  React.FC = () => {
    let [formstate,setformstate] = useState(inivals);
    // let [fileList,setFileList] = useState([]);
    let [hr, sethr] = React.useState('2');
    const router = useRouter();
    const currstate = useAppSelector((state)=>state);
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    
    const handleSubmit = async (values:any) => {
        
        console.log("current values are ",values);

        const res = await fetch('http://localhost:3000/api/mentor/addAvailability',{
            method:'POST',
            body:JSON.stringify({
                mentor_id:currstate.auth.credentials?.id,
                date:values.Date,
                duration:values.Duration,
                start_time:values.Slot.split("-")[0],
                end_time:values.Slot.split("-")[1]
            }),
            headers: {
              'Content-Type': 'application/json',
            }
        });

        const data = res.json();
        // router.push(`/dashboard`);
    }

    const handleChange = (evt:any) =>{
        sethr(evt);
    }

    const onFinish = (values:any) => {
        console.log('Received values of form: ', values);
        setformstate(values);
        // console.log('formstate values are :',formstate);
        handleSubmit(values);
    };

    return (
        <>
            <Form
                  {...formItemLayout}
                  form={form}
                  name="register"
                  onFinish={onFinish}
                  initialValues={{ Duration: 2, Slot: '8-10' }}
                  style={{ maxWidth: 600 }}
                  scrollToFirstError
                  >
                        <Form.Item label="DatePicker" name="Date" 
                            rules={[{
                              required: true,
                              message: "Select a date!",
                            }]}>
                          <DatePicker />
                        </Form.Item>

                        <Form.Item
                          name="Duration"
                          label="Select Duration (Hrs)"
                          rules={[{
                              required: true,
                              message: "Please select duration!",
                            }]}
                        >
                             <Select
                                    placeholder="select your slot duration"
                                    // value={hr}
                                    onChange={handleChange}
                                    options={[
                                    {value:'1', label:'1'},
                                    {value:'2', label:'2'},
                                    {value:'3', label:'3'}
                                    ]}
                                />
                        </Form.Item>
                    
                        <Form.Item
                          name="Slot"
                          label="Select Slot"
                          rules={[
                            {
                              required: true,
                              message: "Please select slot!",
                            },
                          ]}
                        >
                          {hr == '1' && (
                            <Select placeholder="select your slot">
                              <Option value="8 - 9">8 - 9 IST</Option>
                              <Option value="9 - 10">9 - 10 IST</Option>
                              <Option value="10 - 11">10 - 11 IST</Option>
                              <Option value="11 - 12">11 - 12 IST</Option>
                              <Option value="12 - 13">12 - 13 IST</Option>
                              <Option value="15 - 16">15 - 16 IST</Option>
                              <Option value="16 - 17">16 - 17 IST</Option>
                              <Option value="17 - 18">17 - 18 IST</Option>
                              <Option value="18 - 19">18 - 19 IST</Option>
                              <Option value="19 - 20">19 - 20 IST</Option>
                              <Option value="21 - 22">21 - 22 IST</Option>
                              <Option value="22 - 23">22 - 23 IST</Option>
                            </Select>
                          )}
                          {hr == '2' && (
                            <Select placeholder="select your slot">
                              <Option value="8 - 10">8 - 10 IST</Option>
                              <Option value="10 - 12">10 - 12 IST</Option>
                              <Option value="12 - 14">12 - 14 IST</Option>
                              <Option value="15 - 17">15 - 17 IST</Option>
                              <Option value="17 - 19">17 - 19 IST</Option>
                              <Option value="20 - 22">20 - 22 IST</Option>
                            </Select>
                          )}
                          {hr == '3' && (
                            <Select placeholder="select your slot">
                              <Option value="8 - 11">8 - 11 IST</Option>
                              <Option value="12 - 15">12 - 15 IST</Option>
                              <Option value="16 - 19">16 - 19 IST</Option>
                              <Option value="20 - 23">20 - 23 IST</Option>
                            </Select>
                          )}
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                          <Button type="primary" htmlType="submit">
                            Add Slot
                          </Button>
                        </Form.Item>
              </Form>
        </>
    )
}

export default UpdateSlotForm;