import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ListTable from "./ListTable";

// --------------------------------------------------------------------------STYLES
const TWrapper = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  padding: 5%;
`;

// -----------------------------------------------------------------------Component
export default function TableWrapper() {
  // ------------------------------------------------------------------------RENDER
  return (
    <TWrapper>
      <ListTable ranking="collected"/>
    </TWrapper>
  );
}
