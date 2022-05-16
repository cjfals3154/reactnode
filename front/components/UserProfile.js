import { Card, Avatar, Button } from "antd";
import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { logoutRequestAction } from "../reducers/user";

const UserProfile = () => {
  const { me, logOutLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  const CardStyled = useMemo(
    () => ({
      width: 140,
      marginTop: 20,
    }),
    []
  );

  const { Meta } = Card;

  return (
    <Card
      alt="example"
      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      actions={[
        <div key="twit">
          트윗
          <br />
          {me.Posts.length}
        </div>,
        <div key="followings">
          <Link href={"/profile"}>
            <a>
              팔로잉 <br />
              {me.Followings.length}
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href={"/profile"}>
            <a>
              팔로워 <br />
              {me.Followers.length}
            </a>
          </Link>
        </div>,
      ]}
    >
      <Card.Meta
        style={{ paddingLeft: 10 }}
        avatar={
          <Avatar
            src="https://avatars.githubusercontent.com/u/90400739?v=4"
            size={50}
          />
        }
        title={`${me.nickname}님 만나서 반갑습니다.`}
        description="어떤 일이 벌어지고 있을까요?"
      />
      <Button onClick={onLogOut} style={CardStyled} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};
export default UserProfile;
