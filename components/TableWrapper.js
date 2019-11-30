import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DataTable from "./DataTable";

// --------------------------------------------------------------------------STYLES
const TWrapper = styled.div`
  display: flex;
  justify-content: start;
  padding: 5%;
`;

const useTableWrapper = () => {
  const users = useSelector(state => state.users);
  return { users };
};

const getMostCollectedUsers = users =>
  users
    .sort((a, b) => {
      return parseInt(b.pokemon.length) - parseInt(a.pokemon.length);
    })
    .slice(0, 5);
// -----------------------------------------------------------------------Component
export default function TableWrapper() {
  const { users } = useTableWrapper();
  // ------------------------------------------------------------------------RENDER
  return (
    <TWrapper>
      <DataTable
        table="collected"
        rankUsers={getMostCollectedUsers}
        title="Most Collected Pokemon"
        description="Total amount of unique, non-maxed, Pokemon"
      />
    </TWrapper>
  );
}
