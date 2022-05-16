import React, { useMemo, useState } from "react";
import { Drawer, Button, Space, Col, Row } from "antd";

const RightMenu = () => {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");

  const showDrawer = () => {
    setVisible(true);
  };

  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div
      style={{
        cursor: "pointer",
      }}
    >
      <Space>
        <div
          onClick={showDrawer}
          style={{ fontWeight: "bold", fontSize: "22px" }}
        >
          <Button
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
            }}
          >
            👉신철민 더 알아보기👈
          </Button>
        </div>
      </Space>
      <Drawer
        title="프론트엔드 개발자 신철민"
        placement={placement}
        width={500}
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <p>안녕하세요</p>
        <p>프론트엔드 개발자 신철민입니다.</p>
        <p>
          {" "}
          <a
            href="https://github.com/cjfals3154"
            target="_blank"
            //보안상 문제로 해야함
            rel="noreferrer noopener"
          >
            👉 신철민 깃허브
          </a>
        </p>
      </Drawer>
    </div>
  );
};

export default RightMenu;
