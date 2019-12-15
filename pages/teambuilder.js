import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getUserApi} from '../lib/api';
import { useRouter } from "next/router";
import { withRedux } from "../lib/redux";
import Layout from "../components/Layout";
import PokemonGrid from "../components/PokemonGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import TeamBar from '../components/TeamBar';

const useTeamBuilder = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const setUser = user => {
    dispatch({
      type: "SET-USER",
      data: user
    });
  };
  const getPokemonTeam = () => {
    dispatch({
      type: "GET-TEAM"
    });
  };
  return { user, setUser, getPokemonTeam };
};

const TeamBuilder = () => {
  const { user, setUser, getPokemonTeam } = useTeamBuilder();
  const { query } = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const json = await getUser(query, "user-with-teamid")
      setUser(json);
      setIsLoaded(true);
      getPokemonTeam();
    };
    fetchData();
  }, []);
  if (!isLoaded) return <LoadingSpinner />;
  return (
    <Layout>
      <TeamBar/>
      <PokemonGrid />
    </Layout>
  );
};

export default withRedux(TeamBuilder);
