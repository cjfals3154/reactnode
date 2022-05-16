import React, { useCallback, useEffect, useMemo, useState } from "react";
import Head, { Link } from "next/head";
import { Form, Input, Checkbox, Button } from "antd";
import wrapper from "../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { END } from "redux-saga";
import axios from "axios";

import Router from "next/router";
import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";
import { SIGN_UP_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

function Signup() {
  //style
  const errorStyle = useMemo(
    () => ({
      color: "red",
    }),
    []
  );
  //style
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector(
    (state) => state.user
  );

  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);

  // 패스워드 체크
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  //
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  // 로그인 버튼 클릭
  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, password, nickname);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordCheck, term]);

  useEffect(() => {
    if (me && me.id) {
      Router.replace("/");
      alert("로그아웃 후 이용해주세요");
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpDone) {
      Router.replace("/");
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  return (
    <AppLayout>
      <Head>
        <title>NodeBird || 회원가입</title>
      </Head>

      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">아이디</label>
          <br />
          <Input
            name="user-email"
            value={email}
            required
            onChange={onChangeEmail}
            type="email"
          />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input
            name="user-nickname"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호체크</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <div style={errorStyle}>비밀번호가 일치하지 않습니다.</div>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            {termError && (
              <div style={errorStyle}>약관에 동의 하셔야합니다.</div>
            )}
            월 사용료 10,000원에 동의 하십니까?
          </Checkbox>
        </div>
        <div styled={{ marginTop: 15 }}>
          {" "}
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  // 서버쪽에서 실행되면 context.req 라는 것이 존재한다.
  (store) =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      // REQUEST 가 saga 에서 SUCCESS 될 때까지 기다려준다
      store.dispatch(END);

      await store.sagaTask.toPromise();

      // configureStore.js 의 store.sagaTask
    }
);
export default Signup;
