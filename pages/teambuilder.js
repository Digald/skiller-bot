import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getUserApi } from "../lib/api";
import { withRedux } from "../lib/redux";
import Layout from "../components/Layout";
import PokemonGrid from "../components/PokemonGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import TeamBar from "../components/TeamBar";

const useTeamBuilder = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const currentTeam = useSelector(state => state.currentTeam);
  const setUser = user => {
    dispatch({
      type: "SET-USER",
      data: user
    });
  };
  const updateTeam = team => {
    dispatch({
      type: "UPDATE-POKEMON-TEAM",
      data: team
    });
  };
  return { user, setUser, updateTeam, currentTeam };
};

const TeamBuilder = () => {
  const { user, setUser, updateTeam } = useTeamBuilder();
  const { query } = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      let json = await getUserApi(query, "user-with-teamid");
      if (!json) {
        json = {};
        json.team = [];
      }
      setUser(json);
      updateTeam(json.team);
      setIsLoaded(true);
    };
    fetchData();
  }, []);
  if (!isLoaded) return <LoadingSpinner />;
  return (
    <>
      <Layout>
        <TeamBar />
        <PokemonGrid />
      </Layout>
    </>
  );
};

export default withRedux(TeamBuilder);
