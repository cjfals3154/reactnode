import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Menu, Input, Row, Col, Button } from "antd";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import RightMenu from "./RightMenu";
import { createGlobalStyle } from "styled-components";
import useInput from "../hooks/useInput";
import Router from "next/router";
const Global = createGlobalStyle`
  .ant-row{
    margin-right:0 !important;
    margin-left:0 !important;
  }

  .ant-col:first-child{
    padding-left:0 !important;
  }

  .ant-col:last-child{
    padding-right : 0 !important;
  }
`;

const AppLayout = ({ children }) => {
  const [searchInput, onChangeSearchInput] = useInput("");

  const { me } = useSelector((state) => state.user);

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div style={{ marginLeft: 10 }}>
      <Global />
      <Menu
        mode="horizontal"
        style={{
          padding: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Menu.Item style={{ borderRight: "1px solid #ececec" }}>
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item style={{ borderRight: "1px solid #ececec" }}>
          <Link href="profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Input.Search
            placeholder="검색해주세요"
            enterButton="Search"
            size="large"
            style={{ verticalAlign: "middle" }}
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>
        <Menu.Item style={{ borderLeft: "1px solid #ececec" }}>
          <Link href="signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
        <Menu.Item style={{ borderLeft: "1px solid #ececec" }}>
          <RightMenu />
        </Menu.Item>
      </Menu>
      <Row gutter={20}>
        <Col xs={24} md={6} style={{ paddingLeft: "20px" }}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://github.com/cjfals3154" target={"_blank"}>
            신철민 깃허브
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppLayout;
