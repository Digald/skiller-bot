import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sticky from "react-sticky-el";
import { Container, Draggable } from "react-smooth-dnd";
import styled from "styled-components";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import Tooltip from "@material-ui/core/Tooltip";
import { addToTeamApi } from "../lib/api";

const TeamBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
  .icon-container {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
  }
  .smooth-dnd-container {
    border: 1px dashed black;
    min-height: 102px;
    min-width: 102px;
    margin: 0;
  }
  @media (max-width: 600px) {
    justify-content: start;
    align-items: center;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-box-flex: 1;
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
      border: none;
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
  const setPokemon = poke =>
    dispatch({
      type: "SET-POKEMON",
      data: poke
    });
  return { user, currentTeam, updateTeam, setPokemon };
};

export default function TeamBar() {
  const { user, currentTeam, updateTeam, setPokemon } = useTeamBar();
  const [team, setTeam] = useState(currentTeam);
  useEffect(() => {
    setTeam(currentTeam);
  });

  /**
   * Runs when item is dropped anywhere
   * @param {object} dropResult
   */
  async function onDrop(dropResult) {
    document
      .querySelector("body")
      .classList.remove("smooth-dnd-disable-touch-action");
    document
      .querySelector("body")
      .classList.remove("smooth-dnd-no-user-select");
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
    console.log("dropped outside of space, removing");
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

  const getGhostParent = () => {
    return document.body;
  };

  const stickyStyle = { zIndex: 1, background: "#fafafa", height: "102px" };
  return (
    <Sticky stickyStyle={stickyStyle}>
      <TeamBarContainer>
        <div className="icon-container">
          <Tooltip title="Drag N Drop!" aria-label="drag">
            <TouchAppIcon fontSize="large" color="primary" />
          </Tooltip>
          <Tooltip title="Order Pokemon left to right" aria-label="order">
            <DoubleArrowIcon fontSize="large" color="primary" />
          </Tooltip>
        </div>
        <Container
          getGhostParent={getGhostParent}
          dragBeginDelay={0}
          removeOnDropOut={true}
          getChildPayload={getChildPayload}
          autoScrollEnabled={true}
          onDrop={onDrop}
          orientation={"horizontal"}
        >
          {team.map((poke, index) => {
            return (
              <Draggable onClick={() => setPokemon(poke)} key={index}>
                <img src={poke.spriteUrl} />
              </Draggable>
            );
          })}
        </Container>
      </TeamBarContainer>
    </Sticky>
  );
}
