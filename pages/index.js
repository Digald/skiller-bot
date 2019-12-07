import React, { useEffect, useState } from "react";
import { server } from "../lib/config";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import { withRedux } from "../lib/redux";
import { useSelector, useDispatch } from "react-redux";
import TableWrapper from "../components/TableWrapper";
import Layout from "../components/Layout";
import NewsPanel from "../components/NewsPanel";

const PageHeader = styled.h1`
  text-align: center;
  margin: 60px 0;
`;

const useIndex = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const setAllUsers = users => {
    dispatch({
      type: "SET-ALL-USERS",
      data: users
    });
  };
  return { users, setAllUsers };
};

const Index = () => {
  const { users, setAllUsers } = useIndex();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${server}/api/users`);
      const json = await res.json();
      setAllUsers(json);
    };
    if (users.length < 1) {
      fetchData();
    }
  }, []);

  return (
    <Layout>
      <NewsPanel />
      <PageHeader>Latest Player Statistics</PageHeader>
      <TableWrapper />
    </Layout>
  );
};

export default withRedux(Index);
