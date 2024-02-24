'use client';
import React,{ useState } from "react";
import {Row,Col, Switch, Divider} from 'antd';
import MRegister from "@/components/MRegister";
import img9 from '../../../public/img9.jpg';
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SRegister from "@/components/SRegister";
import URegister from "@/components/URegister";

const AuthForm = () => {
    const [state,setState] = useState('Mentor');
    const user = useUser();
    
     const backgroundStyle = {
      //   backgroundImage: `url(${img9.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
     }

     const onChange = (event:any) => {
        console.log(`switch to ${event.target.value}`);
        setState(event.target.value);
    };

     return (
        <>
            <div>
                  <Row style={backgroundStyle} justify="center" align="middle" className="my-6">
                     <Col xs={{span:1}} lg={{span:6}}></Col>
                     <Col xs={{span:22}} lg={{span:12}}>
                              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Enter as : </h3>
                              <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                 <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                          <input id="horizontal-list-radio-license" type="radio" value="Mentor" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={onChange} />
                                          <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mentor</label>
                                    </div>
                                 </li>
                                 <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                          <input id="horizontal-list-radio-id" type="radio" value="Mentee" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"  onChange={onChange}/>
                                          <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mentee</label>
                                    </div>
                                 </li>
                                 <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                          <input id="horizontal-list-radio-id" type="radio" value="University" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"  onChange={onChange}/>
                                          <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">University</label>
                                    </div>
                                 </li>
                              </ul>
                     </Col>
                     <Col xs={{span:1}} lg={{span:6}}></Col>
                  </Row>
                  <Divider>Fill the Details</Divider>
                  <Row style={backgroundStyle} justify="center" align="middle" className="my-6">
                        <Col xs={{span:1}} lg={{span:8}}></Col>
                        <Col xs={{span: 22}} lg={{span: 12}}>
                           <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                              {state}
                           </h2>
                           <div>
                              {state == 'Mentor' && <MRegister />}
                              {state == 'Mentee' && <SRegister />}
                              {state == 'University' && <URegister />}
                           </div>
                        </Col>
                        <Col xs={{span:1}} lg={{span:4}}></Col>
                  </Row>
            </div>
        </>
     )

}

export default AuthForm;