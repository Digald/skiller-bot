import React from "react";
import {useDispatch } from "react-redux";
import styled from "styled-components";

// -------------------------------STYLES
const PokeCard = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0 20px;
  position: relative;
  display: grid;
  max-height: 196px;
  max-width: 120px;
  margin-bottom: 40px;
  justify-items: center;
  font-size: 14px;
  font-weight: bold;
  &:hover {
    .pokemonImg {
      max-width: 120px;
      height: 120px;
      border-radius: 50%;
      background: radial-gradient(#d2ffb8, #ffffff);
    }
  }
  p {
    margin: 0;
  }
`;
const StatSpan = styled.span`
  font-size: 10px;
  color: rgba(0, 0, 0, 0.5);
`;
const NameBorder = styled.div`
  margin: 0 auto;
  height: 2px;
  width: 50%;
  background: #a8ff78; /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #78ffd6, #a8ff78);
  background: linear-gradient(to bottom, #78ffd6, #a8ff78);
`;
const StarsIcon = styled.img`
  position: absolute;
  top: 120px;
  right: 0;
  width: 20px;
`;
const ShinyIcon = styled.img`
  position: absolute;
  top: 19px;
  right: 0;
`;

// -------------------------------HOOK
const useGridCard = () => {
  const dispatch = useDispatch();
  const setPokemon = poke => {
    dispatch({
      type: "SET-POKEMON",
      data: poke
    });
  };
  return { setPokemon };
};
// -------------------------------COMPONENT
const GridCard = ({ poke }) => {
  const { setPokemon } = useGridCard();
  let newID = poke.pokeId;
  if (poke.pokeId.length < 3) {
    newID = "0".repeat(3 - poke.pokeId.length) + poke.pokeId;
  }
  const {hp, atk, spatk, def, spdef, speed} = poke;
  return (
    <PokeCard onClick={() => setPokemon(poke)}>
      <p>
        <StatSpan>stat total</StatSpan>{" "}
        {hp + speed + (atk > spatk ? atk : spatk) + def + spdef}
      </p>
      <img
        className="pokemonImg"
        src={
          poke.shiny
            ? `https://www.serebii.net/Shiny/SM/${newID}.png`
            : `https://www.serebii.net/sunmoon/pokemon/${newID}.png`
        }
      />
<p>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</p>
      <NameBorder></NameBorder>
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
};

export default GridCard;
