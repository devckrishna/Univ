"use client";
import React from "react";
import { Row, Col } from "antd";
import URegister from "@/components/URegister";
import img1 from "../../../public/img12.png";

const UniversityAuthForm = () => {
  
  const backgroundStyle = {
    backgroundImage: `url(${img1.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  };

  return (
    <>
      <div style={{ height: "100vh" }}>
        <Row style={backgroundStyle} justify="center" align="middle">
          <>
            <Col xs={{ span: 1 }} lg={{ span: 4 }}></Col>
            <Col xs={{ span: 22 }} lg={{ span: 20 }}>
              <URegister />
            </Col>
            <Col xs={{ span: 1 }} lg={{ span: 0 }}></Col>
          </>
        </Row>
      </div>
    </>
  );
};

export default UniversityAuthForm;
