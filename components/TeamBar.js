import React from "react";
import { useSelector } from "react-redux";
import { Container, Draggable } from "react-smooth-dnd";
import styled from "styled-components";

const TeamBarContainer = styled.div`
  background-color: grey;
  border: 2px solid black;
  margin: 60px 30% 0 30%;
  height: 120px;
  .smooth-dnd-container {
    display: flex;
    width: 100%;
    height: 100%;
  }
`;

const useTeamBar = () => {
  const currentTeam = useSelector(state => state.currentTeam);
  return { currentTeam};
};

export default function TeamBar(props) {
  const { currentTeam } = useTeamBar();
  console.log(currentTeam)
  return (
    <TeamBarContainer>
      <Container orientation="horizontal">
        {currentTeam.map(poke => {
          return <Draggable><img src={poke.spriteUrl}/></Draggable>;
        })}
      </Container>
    </TeamBarContainer>
  );
}
