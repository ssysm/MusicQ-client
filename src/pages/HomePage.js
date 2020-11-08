import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import { useHistory } from "react-router-dom";

export default function HomePage() {
  const history = useHistory();

  return (
    <div>
      <Row>
        <Col span={14} offset={4}>
            <h1 style={{textAlign: "center"}}>
            Welcome to MusicQ, Please select following options to get started
            </h1>
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={4}>
            <Button
                size={'large'}
              onClick={() => {
                history.push("/create-room");
              }}
            >
              Create New Room
            </Button>
        </Col>
        <Col span={6} offset={4}>
        <Button
            size={'large'}
              onClick={() => {
                history.push("/join-room");
              }}
            >
              Join New Room
            </Button>
        </Col>
      </Row>
    </div>
  );
}
