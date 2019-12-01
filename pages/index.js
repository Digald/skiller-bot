import React, { useEffect } from "react";
import styled from 'styled-components';
import { withRedux } from "../lib/redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import TableWrapper from '../components/TableWrapper';
import Layout from "../components/Layout";
import NewsPanel from '../components/NewsPanel';

const PageHeader = styled.h1`
  text-align: center;
  margin: 60px 0;
`

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "SET-ALL-USERS",
      data: router.query
    });
  });
  return (
    <Layout>
      <NewsPanel/>
      <PageHeader>Latest Player Statistics</PageHeader>
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
