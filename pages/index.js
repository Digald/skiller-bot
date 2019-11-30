import React, { useEffect } from "react";
import { withRedux } from "../lib/redux";
import Link from "next/link";
import TableWrapper from '../components/TableWrapper';
import Layout from "../components/Layout";

const Index = () => {
  return (
    <Layout>
      <TableWrapper />
    </Layout>
  );
};

Index.getInitialProps = ({reduxStore, query}) => {
  const {dispatch} = reduxStore;
  dispatch({
    type: "SET-ALL-USERS",
    data: query
  });
  return {};
};

export default withRedux(Index);
