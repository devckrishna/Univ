'use client';
import React,{useState} from 'react';
// import {Row,Col} from 'antd';
import {AutoComplete,Button,Cascader,Checkbox,Col,Form,Input,InputNumber,Row,Select,Upload,message} from 'antd';
import { UploadOutlined ,PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import img from '../../../../public/img7.jpg';
// import { useNavigate } from "react-router-dom";

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

const CreatePost:  React.FC = () => {
    
    // let location = useLocation();
    // console.log(location);
    // const backgroundImageUrl = `${process.env.PUBLIC_URL}/img1.jfif`;
    const backgroundStyle = {
       backgroundImage: `url(${img.src})`,
       backgroundSize: 'cover',
       backgroundPosition: 'center',
       width: '100%',
       height: '100%'
    }
    // console.log(backgroundImageUrl);

    let [formstate,setformstate] = useState(inivals);
    let [fileList,setFileList] = useState([]);
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [form] = Form.useForm();
    const router = useRouter();
    
    function getBase64(img:any, callback:any) {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
      }

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
        // dispatch(setcredentials({payload:data}));
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
            <div style={{height:'100vh'}}>
                <Row style={backgroundStyle} justify="center" align="middle">
                   
                   <Col xs={{span:1}} lg={{span:4}}></Col>
                   
                   <Col xs={{span: 22}} lg={{span: 16}}>
                                <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} style={{width:'100%'}} scrollToFirstError>
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
                                            name="description"
                                            label="Description"
                                            rules={[
                                            {
                                                message: 'Please input Intro',
                                            },
                                            ]}
                                        >
                                            <Input.TextArea name="description" onChange={handleChange} showCount maxLength={150} />
                                    </Form.Item>
                                                
                                    <Form.Item name="images" label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
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
                                                
                                    <Form.Item {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit">Create Post</Button>
                                    </Form.Item>
                                                
                                </Form>
                    </Col>
                   
                   <Col xs={{span:1}} lg={{span:4}}></Col>
                </Row>
            </div>
        </>
    )

}

export default CreatePost;