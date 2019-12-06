import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetch from "isomorphic-unfetch";
import { server } from "../lib/config";
import { useRouter } from "next/router";
import { withRedux } from "../lib/redux";
import Layout from "../components/Layout";
import PokemonGrid from "../components/PokemonGrid";

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
}

const Collection = () => {
  const { user, setUser } = useCollection();
  const {query} = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      console.log(query);
      const res = await fetch(`${server}/api/user/${query.user}`);
      const json = await res.json();
      console.log(json);
      setUser(json);
    };
      fetchData();
  }, []);
  return (
    <Layout>
      <PokemonGrid />
    </Layout>
  );
};

// Collection.getInitialProps = async ({ reduxStore , query}) => {
//   const res = await fetch(`${server}/api/user/${query.userID}`);
//   const json = await res.json();
//   const { dispatch } = reduxStore;
//   dispatch({
//     type: "SET-USER",
//     data: json
//   });
//   return {};
// };

export default withRedux(Collection);
