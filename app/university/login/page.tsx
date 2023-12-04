"use client";
import React from "react";
import { Row, Col } from "antd";
import Link from "next/link";
// import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { Button, Space } from "antd";
import img1 from "../../../public/img12.png";
import ULogin from "@/components/ULogin";

const UniversityAuthForm: React.FC = () => {
  //  let location = useLocation();
  // const pathname = usePathname();
  //  console.log(pathname);
  const backgroundStyle = {
    backgroundImage: `url(${img1.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
    // display:'flex',
    // justifyContent: 'center',
    // alignItems:'center'
  };

  return (
    <>
      <div style={{ height: "100vh" }}>
        <Row style={backgroundStyle} justify="center" align="middle">
          <>
            <Col xs={{ span: 1 }} lg={{ span: 6 }}></Col>
            <Col xs={{ span: 22 }} lg={{ span: 18 }}>
              <ULogin />
            </Col>
            <Col xs={{ span: 1 }} lg={{ span: 0 }}></Col>
          </>
        </Row>
      </div>
    </>
  );
};

export default UniversityAuthForm;
