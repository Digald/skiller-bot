import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import typesJson from "./types.json";

// --------------------------------------------------------------------------STYLES
const Content = styled.div`
  background: white;
  height: 100%;
  border-radius: 20px;
  margin: 100px 1% 1% 1%;
  padding: 50px 20px 20px 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  .name-space {
      margin-bottom: 20px;
  }
`;

const PokemonImg = styled.img`
  position: absolute;
  width: 200px;
  top: 0;
  left: 200px;
  @media (max-width: 600px) {
    left: 25%;
  }
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
const IconSection = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  p {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
    margin: 0;
  }
  .types {
    display: flex;
    flex-wrap: nowrap;
    text-align: center;
    justify-content: space-evenly;
  }
  .align-section {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: none;
    justify-content: space-evenly;
    align-items: center;
  }
  .stars-icon {
    width: 40px;
  }
`;
const TypesSection = styled.div`
    
`
// ----------------------------------------------------------------------------HOOK
const useModalDetails = () => {
  const pokemon = useSelector(state => state.singlePoke);
  return { pokemon };
};
// -----------------------------------------------------------------------Component
export default function ModalDetails() {
  const { pokemon } = useModalDetails();
  const { types, pokeId, shiny, stars, name } = pokemon;

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
      <div className="name-space">
        <PokemonName>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </PokemonName>
        <NameBorder />
      </div>
      <IconSection>
        <div className="align-section">
          {shiny ? (
            <img src="https://i.ibb.co/8j61Qpb/shining.png" />
          ) : (
            <p>NORMAL</p>
          )}
          <p>RARITY</p>
        </div>
        <div>
          <div>
            {types.map(type => {
              return <img src={`/type-icons/${type.pokeType}.png`} />;
            })}
          </div>
          <div className="types">
            {types.map((type, index) => {
              if (index === types.length - 1) {
                return <p>{type.pokeType.toUpperCase()}</p>;
              }
              return <p>{type.pokeType.toUpperCase()}</p>;
            })}
          </div>
        </div>
        <div className="align-section">
          <img
            className="stars-icon"
            src={
              stars === 3
                ? "https://img.icons8.com/color/48/000000/insignia-3.png"
                : stars === 2
                ? "https://img.icons8.com/color/48/000000/insignia-2.png"
                : stars === 1
                ? "https://img.icons8.com/color/48/000000/insignia-1-stars--v2.png"
                : "https://img.icons8.com/ios-filled/50/000000/pokeball--v2.png"
            }
          />
          <p>LEVEL</p>
        </div>
      </IconSection>
      <TypesSection></TypesSection>
    </Content>
  );
}
