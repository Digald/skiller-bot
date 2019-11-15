import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import IconSummary from "./IconSummary";
import TypeModifiers from "./TypeModifiers";
import StatSummary from "./StatSummary";

// --------------------------------------------------------------------------STYLES
const Content = styled.div`
  /* background: white; */
  height: 100%;
  border-radius: 20px;
  margin: 1%;
  /* padding: 50px 20px 20px 20px; */
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px 100px auto auto auto;
  .bottomImgPanel {
    border-radius: 25px 25px 0px 0px;
    background: white;
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    height: 100%;
    width: 100%;
  }
  .name-space {
    padding-bottom: 20px;
    background: white;
  }
`;

const PokemonImg = styled.img`
  grid-row: 1 / 3;
  grid-column: 1 / 2;
  justify-self: center;
  width: 200px;
  top: 0;
  left: 200px;
  z-index: 2;
  border: 1px solid white;
  border-radius: 50%;
  border-bottom: none;
`;
const PokemonName = styled.h1`
  margin: 0;
  text-align: center;
`;
const NameBorder = styled.div`
  margin: 0 auto;
  height: 2px;
  width: 25%;
  background: #a8ff78; /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #78ffd6, #a8ff78);
  background: linear-gradient(to bottom, #78ffd6, #a8ff78);
`;
// ----------------------------------------------------------------------------HOOK
const useModalDetails = () => {
  const pokemon = useSelector(state => state.singlePoke);
  return { pokemon };
};
// -----------------------------------------------------------------------Component
export default function ModalDetails(props) {
  const { pokemon } = useModalDetails();
  const { pokeId, shiny, name } = pokemon;

  let newID = pokeId;
  if (pokeId) {
    if (pokeId.length < 3) {
      newID = "0".repeat(3 - pokeId.length) + pokeId;
    }
  }
  if (!pokeId) return "";
  // ------------------------------------------------------------------------RENDER
  return (
    <Content>
      <PokemonImg
        className="pokemonImg"
        src={
          shiny
            ? `https://www.serebii.net/Shiny/SM/${newID}.png`
            : `https://www.serebii.net/sunmoon/pokemon/${newID}.png`
        }
      />
      <div className="bottomImgPanel"></div>
      <div className="name-space">
        <PokemonName>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </PokemonName>
        <NameBorder />
      </div>
      <IconSummary />
      <TypeModifiers colors={props} />
      <StatSummary />
    </Content>
  );
}
