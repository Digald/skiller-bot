import React from "react";
import { withRedux } from "../lib/redux";
import Link from "next/link";
import Layout from "../components/Layout";

const Index = () => <div>Hello</div>;

Index.getInitialProps = () => {
  return {};
};

export default withRedux(Index);
