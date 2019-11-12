import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import GridCard from "./GridCard";
import PokeCard from "./PokeCard";

const PokeGrid = styled.div`
  padding: 5% 1% 1% 1%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const usePokemonGrid = () => {
  const pokemon = useSelector(state => state.user.pokemon);
  return { pokemon };
};

const PokemonGrid = () => {
  const { pokemon } = usePokemonGrid();
  if (!pokemon) {
    return <div>Loading...</div>;
  }
  return (
    <PokeGrid>
      {pokemon.map(singlePoke => {
        return <GridCard key={singlePoke._id} poke={singlePoke} />;
      })}
      <PokeCard />
    </PokeGrid>
  );
};

export default PokemonGrid;
