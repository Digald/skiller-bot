import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Draggable } from "react-smooth-dnd";
import styled from "styled-components";
import { addToTeamApi } from "../lib/api";

const TeamBarContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: grey;
  position: relative;
  margin: 0;
  height: 100%;
  width: 100%;
  .smooth-dnd-container {
    margin: 0;
    display: flex;
    justify-content: center;
    width: auto;
    height: 100%;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    .smooth-dnd-container {
      flex-direction: column;
    }
  }
`;

const useTeamBar = () => {
  const dispatch = useDispatch();
  const currentTeam = useSelector(state => state.currentTeam);
  const user = useSelector(state => state.user);
  const updateTeam = team =>
    dispatch({
      type: "UPDATE-POKEMON-TEAM",
      data: team
    });
  return { user, currentTeam, updateTeam };
};

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export default function TeamBar() {
  const { user, currentTeam, updateTeam } = useTeamBar();
  const [team, setTeam] = useState(currentTeam);
  const [width, height] = useWindowSize();
  const orientation = width > 600 ? "horizontal" : "vertical";
  // console.log(orientation);
  useEffect(() => {
    setTeam(currentTeam);
  });

  /**
   * Runs when item is dropped anywhere
   * @param {object} dropResult
   */
  async function onDrop(dropResult) {
    const { removedIndex, addedIndex, payload, element } = dropResult;
    console.log(dropResult);
    // Swap pokemon in currentTeam array
    if (addedIndex !== null) {
      team.splice(removedIndex, 1);
      team.splice(addedIndex, 0, payload);
      setTeam([...team]);
      await addToTeamApi(team, user.teamId);
      updateTeam(team);
      return;
    }
    team.splice(removedIndex, 1);
    setTeam([...team]);
    await addToTeamApi(team, user.teamId);
    updateTeam(team);
    return;
  }

  /**
   *
   * @param {integer} index of pokemon object
   * @return {object} single pokemon object that was dragged
   */
  function getChildPayload(index) {
    return currentTeam[index];
  }

  return (
    <TeamBarContainer>
      <div>First To Battle</div>
      <Container
        removeOnDropOut={true}
        getChildPayload={getChildPayload}
        onDrop={onDrop}
        orientation={"horizontal"}
      >
        {team.map((poke, index) => {
          return (
            <Draggable key={index}>
              <img src={poke.spriteUrl} />
            </Draggable>
          );
        })}
      </Container>
      <div>Last</div>
    </TeamBarContainer>
  );
}
