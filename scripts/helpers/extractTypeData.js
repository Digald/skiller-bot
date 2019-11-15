const axios = require("axios");

/**
 * @param {object} data pokemon data from the pokeAPI that holds types, stats, and other general info
 * @return {object} object of types, 2x, .5x and 0x damage of those types
 */
module.exports = async data => {
  // Collect Type Data for database insertion
  const typesArr = [
    "bug",
    "dragon",
    "fairy",
    "dark",
    "electric",
    "fighting",
    "fire",
    "flying",
    "ghost",
    "grass",
    "ground",
    "ice",
    "normal",
    "poison",
    "psychic",
    "rock",
    "steel",
    "water"
  ];
  const extractTypesData = data.types.map(async type => {
    const damageResponse = await axios.get(type.type.url);
    const damageRelations = damageResponse.data.damage_relations;
    const {
      double_damage_to,
      half_damage_to,
      no_damage_to,
      double_damage_from,
      half_damage_from,
      no_damage_from
    } = damageRelations;
    const generateModifiers = (typesArr, double, half, no) => {
      const result = typesArr.map(type => {
        if (double.filter(obj => obj.name === type).length > 0) {
          return { pokeType: type, mod: 2 };
        } else if (half.filter(obj => obj.name === type).length > 0) {
          return { pokeType: type, mod: 0.5 };
        } else if (no.filter(obj => obj.name === type).length > 0) {
          return { pokeType: type, mod: 0 };
        } else {
          return { pokeType: type, mod: 1 };
        }
      });
      return result;
    };
    const damageTo = generateModifiers(
      typesArr,
      double_damage_to,
      half_damage_to,
      no_damage_to
    );
    const damageFrom = generateModifiers(
      typesArr,
      double_damage_from,
      half_damage_from,
      no_damage_from
    );
    return {
      pokeType: type.type.name,
      damageTo,
      damageFrom
    };
  });
  const p = Promise.all(extractTypesData);
  const typesData = await p.then(v => v);
  return typesData;
};
