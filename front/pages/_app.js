import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import Head from "next/head";
import wrapper from "../store/configureStore";

const App = ({ Component }) => {
  return (
    <div>
      <Head>
        <title>NodeBird</title>
        <meta charSet="utf-8" />
      </Head>
      <Component />
    </div>
  );
};

App.propTypes = {
  Components: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
