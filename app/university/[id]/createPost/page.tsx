'use client';
import React,{useState} from 'react';
import {Col,Form,Input,InputNumber,Row,Select,Upload,message} from 'antd';
import { UploadOutlined ,PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { useToast } from '@/components/ui/use-toast';

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

  let inivals = {
    images:[],
    description:"",
    Title:""
}
const style: React.CSSProperties = { display:'flex', height:'100%', width:'100%', flexDirection:'column',  justifyContent: 'center', alignItems: 'center' };

const CreatePost = ({ params }: { params: { id: string } }) => {

    const { toast }  = useToast();
    const [formstate,setFormstate] = useState(inivals);
    const [fileList,setFileList] = useState([]);
    const {user} = useUser();
    
    const [form] = Form.useForm();
    const router = useRouter();
    const backgroundStyle = {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: '100%'
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

        const res = await fetch('/api/posts',{
            method:'POST',
            body:JSON.stringify({
                title:values.Title,
                email:user?.emailAddresses[0].emailAddress,
                description:values.description,
                images:arr,
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
        setFormstate({...formstate,[name]: value});
    }

    const Textvalidation = (values:any) => {
        if(values.description.length<100)return false;
        return true;
    }

    const onFinish = (values:any) => {
        console.log('Received values of form: ', values);
        if(!values.description)values.description = "";
        if(!values.images)values.images = [];
        setFormstate(values);
        if(!Textvalidation(values)){
            toast({
                variant: "destructive",
                title: "Please add atleast 100 words !",
                description: "The description is too short! Please add atleast 100 words. ",
              })
            return;
        }
        if(values.images.length==0){
            toast({
                variant: "destructive",
                title: "Please upload atleast 1 image !",
                description: "You need to add atleast 1 image to your post !",
              })
              return;
        }
        handleSubmit(values);
    };
  
    return (
        <>
            <div style={{height:'90.8vh'}}>
                
                    <Row style={{height:'100%'}} justify="center" align="middle">
                        <Col xs={{span: 0}} lg={{span: 12}} style={backgroundStyle}>
                            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                                <div className="absolute inset-0 bg-blue-800" />
                                <div className="relative z-20 flex items-center text-lg font-medium">
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-6 w-6"
                                    >
                                    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                                    </svg>
                                    ConVarse
                                </div>
                                {/* <div className='w-full h-full flex justify-center items-center'>
                                      <div className='flex justify-center items-center flex-col'>
                                        <Avatar>
                                          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                          <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <Button className='w-full text-white'>Go To Profile Page</Button>
                                        <Button className='w-full text-white'>Go To Dashboard</Button>
                                      </div>
                                </div> */}
                                <div className="relative z-20 mt-auto">
                                    <blockquote className="space-y-2">
                                    <p className="text-lg">
                                        &ldquo;Education is the passport to the future, for tomorrow belongs to those who prepare for it today.&rdquo;
                                    </p>
                                    <footer className="text-sm">- Malcolm X</footer>
                                    </blockquote>
                                </div>
                            </div>
                        </Col>

                        <Col xs={{span:24}} lg={{span:12}} style={style}>
                          <div className="flex min-h-full w-11/12 flex-1 flex-col justify-center items-center px-2 lg:px-4">
                              <div className="m-0 w-11/12">
                                <Form form={form} name="register" onFinish={onFinish} layout='vertical' scrollToFirstError>
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
                                                className='w-full'
                                            >
                                                <Input name="Title" className='w-full' value={formstate.Title} onChange={handleChange} />
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
                                
                                                    <Input.TextArea name="description" value={formstate.description} onChange={handleChange} showCount maxLength={5000} />
                                            </Form.Item>
                                                        
                                            <Form.Item name="images" label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                                                <Upload
                                                    // action={null}
                                                    beforeUpload={()=>{return false;}}
                                                    listType="picture-card"
                                                    fileList={fileList}
                                                    maxCount={4}
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
                                            
                                            <Form.Item>
                                                <Button className='w-full bg-blue-800'>Create Post</Button>
                                            </Form.Item>
                                                        
                                    </Form>
                              </div>
                          </div>
                        </Col>
                    </Row>
            </div>

        </>
    )

}

export default CreatePost;