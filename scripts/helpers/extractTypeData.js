const axios = require("axios");
/**
 * @param {object} data pokemon data from the pokeAPI that holds types, stats, and other general info
 * @return {object} object of types, 2x, .5x and 0x damage of those types
 */
module.exports = async data => {
  // Collect Type Data for database insertion
  const extractTypesData = data.types.map(async type => {
    const damageResponse = await axios.get(type.type.url);
    const damageRelations = damageResponse.data.damage_relations;
    const { double_damage_to, half_damage_to, no_damage_to } = damageRelations;
    const doubleDamageTo = double_damage_to.map(type => type.name);
    const halfDamageTo = half_damage_to.map(type => type.name);
    const noDamageTo = no_damage_to.map(type => type.name);
    const strongAgainst = []
    const weakAgainst = []
    console.log(damageRelations);
    return {
      pokeType: type.type.name,
      strongAgainst,
      weakAgainst
    };
  });
  const p = Promise.all(extractTypesData);
  const typesData = await p.then(v => v);
  return typesData;
};
