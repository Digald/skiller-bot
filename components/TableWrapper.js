import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DataTable from "./DataTable";

// --------------------------------------------------------------------------STYLES
const TWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const getMostCollectedUsers = users =>
  users
    .sort((a, b) => {
      return parseInt(b.pokemon.length) - parseInt(a.pokemon.length);
    })
    .slice(0, 5);

const getMostLeveledUsers = users =>
  users
    .map(user => {
      user.total = user.pokemon
        .map(poke => poke.stars + poke.timesEvolved * 3)
        .reduce((total, curr) => total + curr);
      return user;
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

const getMostShinyUsers = users =>
  users
    .map(user => {
      user.shinyTotal = user.pokemon.filter(poke => poke.shiny === true).length;
      return user;
    })
    .sort((a, b) => b.shinyTotal - a.shinyTotal)
    .slice(0, 5);
// -----------------------------------------------------------------------Component
export default function TableWrapper() {
  // ------------------------------------------------------------------------RENDER
  return (
    <TWrapper>
      <DataTable
        table="collected"
        rankUsers={getMostCollectedUsers}
        title="Most Collected Pokemon"
        description="Count of individually listed Pokemon"
      />
      <DataTable
        table="leveled"
        rankUsers={getMostLeveledUsers}
        title="Most Leveled Pokemon"
        description="Times any Pokemon has leveled up."
      />
      <DataTable
        table="shiny"
        rankUsers={getMostShinyUsers}
        title="Most Shiny Pokemon"
        description="Number of shiny listed Pokemon"
      />
    </TWrapper>
  );
}
