'use client';
import React,{useState} from 'react';
// import {Row,Col} from 'antd';
import {AutoComplete,Button,Cascader,Checkbox,Col,Form,Input,InputNumber,Row,Select,Upload,message} from 'antd';
import { UploadOutlined ,PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import img from '../../../../public/img7.jpg';
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import '../../../../public/style.css';

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
    let [formstate,setformstate] = useState(inivals);
    let [fileList,setFileList] = useState([]);
    // const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [form] = Form.useForm();
    const router = useRouter();
    const backgroundStyle = {
      backgroundImage: `url(${img.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: '100%'
   }

  //  const onEditorStateChange = (editorState:any) => {
  //   console.log('editor state is ',editorState.getCurrentContent());
  //     setEditorState(editorState);
  //   };

    // function getBase64(img:any, callback:any) {
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
        // dispatch(setcredentials({payload:data}));
        router.push(`/dashboard/${data._id}`);
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
        handleSubmit();
    };
  
    return (
        <>
            <div style={{height:'100vh'}}>
                <Row style={backgroundStyle} justify="center" align="middle">
                   
                   <Col xs={{span:1}} lg={{span:7}}></Col>
                   
                   <Col xs={{span: 22}} lg={{span: 15}}>
                                <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} layout='vertical' style={{width:'100%'}} scrollToFirstError>
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
                                                message: 'Please add description !',
                                            },
                                            ]}
                                        >
                                          {/* <Editor
                                            editorState={editorState}
                                            onEditorStateChange={onEditorStateChange}
                                            wrapperClassName="demo-wrapper"
                                            editorClassName="demo-editor editor"
                                            // editorStyle = {editorStyle}
                                          /> */}
                                          
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
                   
                   <Col xs={{span:1}} lg={{span:2}}></Col>
                </Row>
            </div>
        </>
    )

}

export default CreatePost;