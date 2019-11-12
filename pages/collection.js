import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { withRedux } from "../lib/redux";
import Layout from "../components/Layout";
import PokemonGrid from "../components/PokemonGrid";

const Collection = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "SET-USER",
      data: router.query
    });
  });
  return (
    <Layout>
      <PokemonGrid />
    </Layout>
  );
};

Collection.getInitialProps = () => {
  return {};
};

export default withRedux(Collection);
