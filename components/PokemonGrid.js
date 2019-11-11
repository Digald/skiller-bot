import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const PokeGrid = styled.div`
  padding: 5%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PokeCard = styled.div`
  position: relative;
  display: grid;
  max-height: 196px;
  max-width: 120px;
  margin-bottom: 40px;
  justify-items: center;
  p {
    margin: 0;
  }
`;

const StarsIcon = styled.img`
  width: 40px;
`;

const ShinyIcon = styled.img`
  position: absolute;
  top: 0;
  right: 0;
`;

const PokemonGrid = () => {
  const router = useRouter();
  return (
    <PokeGrid>
      {router.query.pokemon.map(poke => {
        let newID = poke.pokeId;
        if (poke.pokeId.length < 3) {
          newID = "0".repeat(3 - poke.pokeId.length) + poke.pokeId;
        }
        return (
          <PokeCard>
            <p>Dex #{poke.pokeId}</p>
            <img
              src={
                poke.shiny
                  ? `https://www.serebii.net/Shiny/SM/${newID}.png`
                  : `https://www.serebii.net/sunmoon/pokemon/${newID}.png`
              }
            />
            <p>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</p>
            <StarsIcon
              src={
                poke.stars === 3
                  ? "https://img.icons8.com/color/48/000000/insignia-3.png"
                  : poke.stars === 2
                  ? "https://img.icons8.com/color/48/000000/insignia-2.png"
                  : poke.stars === 1
                  ? "https://img.icons8.com/color/48/000000/insignia-1-stars--v2.png"
                  : "https://img.icons8.com/ios-filled/50/000000/pokeball--v2.png"
              }
            />
            {poke.shiny ? (
              <ShinyIcon src="https://i.ibb.co/8j61Qpb/shining.png" />
            ) : (
              ""
            )}
          </PokeCard>
        );
      })}
    </PokeGrid>
  );
};

export default PokemonGrid;
