import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Draggable } from "react-smooth-dnd";
import styled from "styled-components";

const TeamBarContainer = styled.div`
  background-color: grey;
  position: relative;
  margin: 0;
  height: 100%;
  width: 100%;
  .smooth-dnd-container {
    display: flex;
    justify-content: center;
    width: auto;
    height: 100%;
  }
  @media(max-width: 600px) {
    .smooth-dnd-container {
      flex-direction: column;
      align-items: center;
    }
  }
`;

const useTeamBar = () => {
  const currentTeam = useSelector(state => state.currentTeam);
  return { currentTeam };
};

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default function TeamBar() {
  const { currentTeam } = useTeamBar();
  const [team, setTeam] = useState(currentTeam);
  const [width, height] = useWindowSize();
  console.log(width > 600 ? "horizontal" : "vertical");
  useEffect(() => {
    setTeam(currentTeam);
  });
  return (
    <TeamBarContainer>
      <Container orientation={width > 600 ? "horizontal" : "vertical"}>
        {team.map((poke, index) => {
          return (
            <Draggable key={index}>
              <img src={poke.spriteUrl} />
            </Draggable>
          );
        })}
      </Container>
    </TeamBarContainer>
  );
}
