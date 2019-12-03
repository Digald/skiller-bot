import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import fetch from "isomorphic-unfetch";
import { server } from "../lib/config";
import { useRouter } from "next/router";
import { withRedux } from "../lib/redux";
import Layout from "../components/Layout";
import PokemonGrid from "../components/PokemonGrid";

const Collection = () => {
  return (
    <Layout>
      <PokemonGrid />
    </Layout>
  );
};

Collection.getInitialProps = async ({ reduxStore , query}) => {
  const res = await fetch(`${server}/api/user/${query.userID}`);
  const json = await res.json();
  const { dispatch } = reduxStore;
  console.log(json);
  dispatch({
    type: "SET-USER",
    data: json
  });
  return {};
};

export default withRedux(Collection);
