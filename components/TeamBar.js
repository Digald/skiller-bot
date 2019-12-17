import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sticky from "react-sticky-el";
import { Container, Draggable } from "react-smooth-dnd";
import styled from "styled-components";
import { addToTeamApi } from "../lib/api";

const TeamBarContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 0;
  height: 100%;
  width: 100vw;
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
    overflow-x: scroll;
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #f5f5f5;
    }

    ::-webkit-scrollbar {
      width: 20px;
      background-color: #f5f5f5;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #f90;
      background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
      );
    }
    .smooth-dnd-container {
      margin: 0 0 0 60%;
    }
    @media (max-width: 350px) {
      .smooth-dnd-container {
        margin: 0 0 0 100%;
      }
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
  console.log(orientation);
  useEffect(() => {
    setTeam(currentTeam);
  });

  /**
   * Runs when item is dropped anywhere
   * @param {object} dropResult
   */
  async function onDrop(dropResult) {
    const { removedIndex, addedIndex, payload, element } = dropResult;
    // Swap pokemon in currentTeam array
    if (addedIndex !== null) {
      team.splice(removedIndex, 1);
      team.splice(addedIndex, 0, payload);
      setTeam([...team]);
      await addToTeamApi(team, user.teamId);
      updateTeam([...team]);
      return;
    }
    team.splice(removedIndex, 1);
    setTeam([...team]);
    await addToTeamApi(team, user.teamId);
    updateTeam([...team]);
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
    <Sticky>
      <TeamBarContainer>
        <Container
          removeOnDropOut={true}
          getChildPayload={getChildPayload}
          autoScrollEnabled={true}
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
      </TeamBarContainer>
    </Sticky>
  );
}
