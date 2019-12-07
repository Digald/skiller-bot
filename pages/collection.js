import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetch from "isomorphic-unfetch";
import { server } from "../lib/config";
import { useRouter } from "next/router";
import { withRedux } from "../lib/redux";
import Layout from "../components/Layout";
import PokemonGrid from "../components/PokemonGrid";
import LoadingSpinner from "../components/LoadingSpinner";

const useCollection = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const setUser = user => {
    dispatch({
      type: "SET-USER",
      data: user
    });
  };
  return { user, setUser };
};

const Collection = () => {
  const { user, setUser } = useCollection();
  const { query } = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${server}/api/user/${query.user}`);
      const json = await res.json();
      setUser(json);
      setIsLoaded(true);
    };
    fetchData();
  }, []);
  if (!isLoaded) return <LoadingSpinner />;
  return (
    <Layout>
      <PokemonGrid />
    </Layout>
  );
};

export default withRedux(Collection);
