import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

// --------------------------------------------------------------------------STYLES
const TypesSection = styled.div`
  background: white;
  padding: 0px 20px 20px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  .damage-type {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 25px;
    .first-title {
      margin-top: 20px;
    }
    p {
      background: ${props => props.gradient};
      border-radius: 25px;
      padding: 10px 30px;
      color: white;
      letter-spacing: 4px;
    }
    .type-mods {
      padding: 0 20px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
    .centerMods {
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 12px;
    }
  }
`;
// ----------------------------------------------------------------------------HOOK
const useTypeModifiers = () => {
  const pokemon = useSelector(state => state.singlePoke);
  return { pokemon };
};
// -----------------------------------------------------------------------Component
export default function TypeModifiers(props) {
  const { pokemon } = useTypeModifiers();
  const { types } = pokemon;
  let hasTwoTypes = false;
  if (types.length !== 1) {
    hasTwoTypes = true;
  }
  const calcModifiers = (type, index, damageDir, hasTwoTypes) => {
    const mod = hasTwoTypes ? type.mod * types[1][damageDir][index].mod : type.mod;
    if (mod === 1) return "";
    return (
      <div key={index} className="centerMods">
        <img src={`/type-icons/${type.pokeType}.png`} />
        <span>x{mod}</span>
      </div>
    );
  };
  // ------------------------------------------------------------------------RENDER
  return (
    <TypesSection gradient={props.colors.colors}>
      <div className="damage-type">
        <p className="first-title">DAMAGE TO</p>
        <div className="type-mods">
          {/* Loop through each type and show the icon with the damage modifier. If more than one types, multiply the two modifiers using the same index from the loop. */}
          {types[0].damageTo.map((type, index) => {
            return calcModifiers(type, index, "damageTo");
          })}
        </div>
      </div>
      <div className="damage-type">
        <p>RESISTANCE FROM</p>
        <div className="type-mods">
          {/* Loop through each type and show the icon with the damage modifier. If more than one types, multiply the two modifiers using the same index from the loop. */}
          {types[0].damageFrom.map((type, index) => {
            return calcModifiers(type, index, "damageFrom");
          })}
        </div>
      </div>
    </TypesSection>
  );
}
