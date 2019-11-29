import React, { useEffect } from "react";
import { withRedux } from "../lib/redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import TableWrapper from '../components/TableWrapper';
import Layout from "../components/Layout";

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
      <TableWrapper />
    </Layout>
  );
};

// Index.getInitialProps = () => {
//   return {};
// };

export default withRedux(Index);
