import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import { getUserApi } from "../lib/api";
import { withRedux } from "../lib/redux";
import Layout from "../components/Layout";
import PokemonGrid from "../components/PokemonGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import TeamBar from "../components/TeamBar";

const Message = styled.p`
  position: absolute;
  bottom: 0;
  margin: 0;
  text-align: center;
  font-size: 20px;
  color: white;
  width: 100%;
  background-color: red;
  transition: opacity 3s ease-in-out;
  -webkit-transition: opacity 3s ease-in-out;
  -moz-transition: opacity 3s ease-in-out;
  -ms-transition: opacity 3s ease-in-out;
  -o-transition: opacity 3s ease-in-out;
  transition: opacity 3s ease-in-out;
  opacity: 1;
`;

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
      const json = await getUserApi(query, "user-with-teamid");
      setUser(json);
      updateTeam(json.team);
      setIsLoaded(true);
    };
    fetchData();
  }, []);
  if (!isLoaded) return <LoadingSpinner />;
  return (
    <Layout>
      <TeamBar />
      <PokemonGrid/>
    </Layout>
  );
};

export default withRedux(TeamBuilder);
