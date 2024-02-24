'use client';
import React,{useState} from 'react';
// import {Row,Col} from 'antd';
import {Col,Form,Input,InputNumber,Row,Select,Upload,message} from 'antd';
import { UploadOutlined ,PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import img from '../../../../public/img7.jpg';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';

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

const CreatePost = ({ params }: { params: { id: string } }) => {

    // const backgroundImageUrl = `${process.env.PUBLIC_URL}/img1.jfif`;
    let [formstate,setformstate] = useState(inivals);
    let [fileList,setFileList] = useState([]);
    const {user} = useUser();
    // const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [form] = Form.useForm();
    const router = useRouter();
    const backgroundStyle = {
      backgroundImage: `url(${img.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: '100%',
   }

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

        const res = await fetch('http://localhost:3000/api/posts',{
            method:'POST',
            body:JSON.stringify({
                title:values.title,
                email:user?.emailAddresses[0].emailAddress,
                description:values.description,
                images:arr
            }),
            headers: {
                'Content-Type': 'application/json',
              }
        });
        const data = await res.json();
        console.log("data got is :", data);
        // dispatch(setcredentials({payload:data}));
        router.push(`/university/${params.id}`);
    }

    const handleChange = (evt:any) =>{
        const { name, value } = evt.target;
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
            <div style={{height:'100vh'}}>
                <div style={backgroundStyle} className='blur-lg'></div>
                
                <div className='absolute top-1/2 left-1/2 w-full z-20' style={{transform:'translate(-50%,-50%)'}}>
                      <Row justify="center" align="middle">
                        
                        <Col xs={{span:1}} lg={{span:5}}></Col>   
                        <Col xs={{span: 22}} lg={{span:10}}>
                                  <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} layout='vertical' style={{width:'100%'}} className='flex flex-col justify-center' scrollToFirstError>
                                        <Form.Item
                                              name="Title"
                                              label="Title"
                                              rules={[
                                              {
                                                  required: true,
                                                  message: 'Please input the Title!',
                                                  whitespace: true,
                                              },
                                              ]}
                                          >
                                              <Input name="Title" onChange={handleChange} />
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
                                                
                                                  <Input.TextArea name="description" onChange={handleChange} showCount maxLength={2000} />
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
                                                      
                                          {/* <Form.Item {...tailFormItemLayout}> */}
                                              <Button className='w-1/2'>Create Post</Button>
                                          {/* </Form.Item> */}
                                                      
                                  </Form>
                          </Col>
                        
                        <Col xs={{span:1}} lg={{span:2}}></Col>
                      </Row>
                </div>

            </div>
        </>
    )

}

export default CreatePost;