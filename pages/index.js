import React from "react";
import { server } from "../lib/config";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import { withRedux } from "../lib/redux";
import { useSelector } from "react-redux";
import TableWrapper from "../components/TableWrapper";
import Layout from "../components/Layout";
import NewsPanel from "../components/NewsPanel";

const PageHeader = styled.h1`
  text-align: center;
  margin: 60px 0;
`;

const useIndex = () => {
  const users = useSelector(state => state.users);
  return { users };
};

const Index = () => {
  const { users } = useIndex();

  if (!users) return <div>Loading...</div>;
  return (
    <Layout>
      <NewsPanel />
      <PageHeader>Latest Player Statistics</PageHeader>
      <TableWrapper />
    </Layout>
  );
};

Index.getInitialProps = async ({ reduxStore }) => {
  const res = await fetch(`${server}/api/users`);
  const json = await res.json();
  const { dispatch } = reduxStore;
  dispatch({
    type: "SET-ALL-USERS",
    data: json
  });
  return {};
};

export default withRedux(Index);
