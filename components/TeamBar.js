import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Draggable } from "react-smooth-dnd";
import styled from "styled-components";

const TeamBarContainer = styled.div`
  background-color: grey;
  border: 2px solid black;
  margin: 60px 30% 0 30%;
  height: 120px;
`;

const useTeamBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const team = useSelector(state => state.currentTeam);
  return { user, team };
};

export default function TeamBar(props) {
  const { user, team } = useTeamBar();
  return (
    <TeamBarContainer>
      <Container>
        {team.map(poke => {
          return <Draggable>{poke.sprite}</Draggable>;
        })}
      </Container>
    </TeamBarContainer>
  );
}
