const axios = require("axios");
const db = require("../models");
const extractTypesData = require("./helpers/extractTypeData");
const catchPokemon = require("./pokemon-catch");
const logger = require("./logger.js");

// 468570185847013379 private message id for skiller-bot
// pokemon channel id 441820156197339136
module.exports = async (msg, client) => {
  // For testing privately
  if (msg.author.id !== "129038630953025536") {
    return;
  }

  // If the pokemon has already been caught by the user
  const spawn = await db.Spawn.findOne({});
  if (spawn.caughtBy.indexOf(msg.author.id) !== -1) {
    return msg.reply(
      `Try again in ${((28800000 + spawn.lastSpawnTime - Date.now()) /
        3600000).toFixed(2)} hours. You've caught a pokemon recently.`
    );
  }
  // Update the caught list for the pokemon
  db.Spawn.updateOne({}, { $push: { caughtBy: msg.author.id } }).exec();

  logger(msg);

  async function spawnPokemon() {
    // Exclude Mythical and Legendaries for now
    const exclusionList = [
      "151",
      "251",
      "385",
      "386",
      "490",
      "489",
      "491",
      "492",
      "493",
      "494",
      "647",
      "648",
      "649",
      "719",
      "720",
      "721",
      "801",
      "802",
      "807",
      "145",
      "144",
      "146",
      "150",
      "244",
      "245",
      "243",
      "249",
      "250",
      "377",
      "378",
      "379",
      "380",
      "381",
      "382",
      "383",
      "384",
      "480",
      "481",
      "482",
      "483",
      "484",
      "485",
      "487",
      "488",
      "486",
      "638",
      "639",
      "640",
      "641",
      "642",
      "645",
      "643",
      "644",
      "646",
      "716",
      "717",
      "718",
      "772",
      "773",
      "785",
      "786",
      "787",
      "788",
      "789",
      "790",
      "791",
      "792",
      "800"
    ];

    // Return random number
    const randomNum = () => Math.ceil(Math.random() * 807);

    // Finds basic pokemon form based on random choice
    const findBasicForm = async pokeUrl => {
      const url = pokeUrl;
      const res = await axios.get(url);
      const data = await res.data;
      const { id, name, evolves_from_species, evolution_chain } = data;
      return {
        id,
        name,
        from: evolves_from_species ? evolves_from_species.url : null,
        chainUrl: evolution_chain.url
      };
    };

    // Find random pokemon number & Make sure it is in the basic form
    let randomPoke = randomNum();
    while (exclusionList.indexOf(randomPoke.toString()) !== -1) {
      randomPoke = randomNum();
    }
    let basicForm = await findBasicForm(
      `https://pokeapi.co/api/v2/pokemon-species/${randomPoke}/`
    );
    while (basicForm.from != null) {
      basicForm = await findBasicForm(basicForm.from);
    }

    // Make call to get final pokemon data
    // const url = `https://pokeapi.co/api/v2/pokemon/1/`;
    const url = `https://pokeapi.co/api/v2/pokemon/${basicForm.id}/`;
    const res = await axios.get(url);
    const data = await res.data;

    // Check if pokemon is shiny or not, get theme color
    const { sprites } = data;
    const shinyChance = Math.floor(Math.random() * 20);
    let sprite;
    let shiny = false;
    if (shinyChance === 0) {
      sprite = sprites.front_shiny;
      shiny = true;
    } else {
      sprite = sprites.front_default;
    }

    // Collect Type Data for database insertion
    const typesData = await Promise.resolve(extractTypesData(data));

    // Insert all data into Spawn schema
    const { stats } = data;
    const pokemon = {
      name: data.name,
      pokeId: basicForm.id,
      evolChainUrl: basicForm.chainUrl,
      types: typesData,
      shiny: shiny,
      spriteUrl: sprite,
      hp: stats[5].base_stat,
      atk: stats[4].base_stat,
      spatk: stats[2].base_stat,
      def: stats[3].base_stat,
      spdef: stats[1].base_stat,
      speed: stats[0].base_stat
    };
    return pokemon;
  }
  const pokemon = await spawnPokemon();
  catchPokemon(msg, client, pokemon);
};
