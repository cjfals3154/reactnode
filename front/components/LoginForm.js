import React, { useCallback, useEffect, useMemo } from "react";
import { Form, Button, Input } from "antd";
import Link from "next/link";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../reducers/user";

const LoginForm = () => {
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const ButtonStyled = useMemo(
    () => ({
      marginTop: 15,
    }),
    []
  );

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  // 로그인 버튼 클릭
  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <Form onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <Input
          name="user-email"
          value={email}
          onChange={onChangeEmail}
          required
          type="email"
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <div style={ButtonStyled}>
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
};
export default LoginForm;
