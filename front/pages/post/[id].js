import React, { useEffect } from "react";

import { useRouter } from "next/router";
import axios from "axios";
import { END } from "redux-saga";

import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POST_REQUEST } from "../../reducers/post";
import Router from "next/router";

function Post() {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);

  return (
    <AppLayout>
      <PostCard post={singlePost} />
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  // 서버쪽에서 실행되면 context.req 라는 것이 존재한다.
  (store) =>
    async ({ req, params }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch({
        type: LOAD_POST_REQUEST,
        data: params.id,
      });
      // REQUEST 가 saga 에서 SUCCESS 될 때까지 기다려준다
      store.dispatch(END);

      await store.sagaTask.toPromise();

      // configureStore.js 의 store.sagaTask
    }
);

export default Post;
