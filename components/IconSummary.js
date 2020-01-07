import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

// --------------------------------------------------------------------------STYLES
const IconSummary = styled.div`
  background: white;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  .typeIcon-wrap {
    display: flex;
    flex-wrap: nowrap;
  }
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
// ----------------------------------------------------------------------------HOOK
const useIconSection = () => {
  const pokemon = useSelector(state => state.singlePoke);
  return { pokemon };
};
// -----------------------------------------------------------------------Component
export default function IconSection() {
  const { pokemon } = useIconSection();
  const { types, shiny, stars } = pokemon;

  // ------------------------------------------------------------------------RENDER
  return (
    <IconSummary>
      <div className="align-section">
        {shiny ? (
          <img src="/icons/shining.png" />
        ) : (
          <p>NORMAL</p>
        )}
        <p>RARITY</p>
      </div>
      <div>
        <div className="typeIcon-wrap">
          {types.map((type, index) => {
            return <img key={index} src={`/type-icons/${type.pokeType}.png`} />;
          })}
        </div>
        <div className="types">
          {types.map((type, index) => {
            if (types.length - 1 === index) {
              return <p key={index}>{type.pokeType.toUpperCase()}</p>;
            }
            return <p key={index}>{type.pokeType.toUpperCase()} /</p>;
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
    </IconSummary>
  );
}
