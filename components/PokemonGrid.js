import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styled from "styled-components";
import GridCard from "./GridCard";
import PokeCard from "./PokeModal";
import AddToTeamButton from "./AddToTeamBtn";

const PokeGrid = styled.div`
  padding: 5% 1% 1% 1%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const GridCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  align-items: center;
`;

const usePokemonGrid = () => {
  const pokemon = useSelector(state => state.user.pokemon);
  return { pokemon };
};

const PokemonGrid = () => {
  const { pokemon } = usePokemonGrid();
  const { pathname } = useRouter();
  return (
    <PokeGrid>
      {pokemon.map(singlePoke => {
        return (
          <GridCardContainer key={singlePoke._id}>
            <GridCard poke={singlePoke} />
            {pathname === "/teambuilder" ? <AddToTeamButton poke={singlePoke}/> : ""}
          </GridCardContainer>
        );
      })}
      <PokeCard />
    </PokeGrid>
  );
};

export default PokemonGrid;
