import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Container, Draggable } from "react-smooth-dnd";
import styled from "styled-components";

const TeamBarContainer = styled.div`
  background-color: grey;
  margin: 60px 30% 0 30%;
  .smooth-dnd-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
  }
`;

const useTeamBar = () => {
  const currentTeam = useSelector(state => state.currentTeam);
  return { currentTeam };
};

export default function TeamBar() {
  const { currentTeam } = useTeamBar();
  const [team, setTeam] = useState(currentTeam);
  useEffect(() => {
    console.log('rerender')
    setTeam(currentTeam);
  })
  return (
    <TeamBarContainer>
      <Container orientation="horizontal">
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
