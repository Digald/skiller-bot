import React from "react";
import Layout from "../components/Layout";
import PokemonGrid from "../components/PokemonGrid";

const Collection = () => {
  return (
    <Layout>
      <PokemonGrid />
    </Layout>
  );
};

Collection.getInitialProps = () => {
  return {};
};

export default Collection;
