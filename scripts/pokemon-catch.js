const axios = require("axios");
const db = require("../models");
const logger = require("./logger.js");

module.exports = async msg => {
  logger(msg);
  const userId = msg.author.id;

  // Grab pokemon spawn object
  const getPokemon = await db.Spawn.findOne();
  const {
    name,
    pokeId,
    evolChainUrl,
    types,
    shiny,
    spriteUrl,
    hp,
    atk,
    def,
    speed
  } = getPokemon;
  const pokemonObj = {
    name,
    pokeId,
    evolChainUrl,
    types,
    shiny,
    spriteUrl,
    hp,
    atk,
    def,
    speed
  };
  // If the pokemon has already been caught by the user
  if (getPokemon.caughtBy.indexOf(userId) !== -1) {
    return msg.reply(`You've already caught this ${getPokemon.name}.`);
  }

  // Update the caught list for the pokemon
  db.Spawn.updateOne(
    { name: getPokemon.name },
    { $push: { caughtBy: msg.author.id } }
  ).exec();

  // Check if user exists in the database
  const requestingUser = await db.User.findOne({ discordId: userId });

  // if the user does not exist, create user
  if (!requestingUser) {
    const userObject = {
      discordId: userId,
      discordIcon: msg.author.avatarURL,
      pokemon: [pokemonObj]
    };
    db.User.create(userObject);
    return msg.reply(`${getPokemon.name} has been added to your collection!`);
  }

  // Check if user already has that pokemon since they exist
  let hasPokemonCheck = requestingUser.pokemon.filter(poke => {
    return poke.name === name;
  });

  // If the user doesn't have the pokemon, push it to their collection
  if (hasPokemonCheck.length < 1) {
    db.User.updateOne(
      { discordId: userId },
      { $push: { pokemon: pokemonObj } }
    ).exec();
    return msg.reply(`${getPokemon.name} has been added to your collection!`);
  }
  hasPokemonCheck = hasPokemonCheck[0];

  // const res = await axios.get(hasPokemonCheck.evolChainUrl);
  const res = await axios.get("https://pokeapi.co/api/v2/evolution-chain/1/");
  const data = await res.data;
  let currentPath = data.chain;

  const evolvePokemon = async testPokemon => {
    if (testPokemon.stars === 2) {
      console.log("Make API call");
      // Does this pokemon evolve or not?
      if (currentPath.species.name === testPokemon.name) {
        console.log("Yes pokemon name matches species");
        const evolvesTo = currentPath.evolves_to;
        if (evolvesTo.length > 0) {
          console.log("Yes there is an evolution available");
          // if YES, get a random item in the array and evolve
          const evolution =
            evolvesTo[Math.floor(Math.random() * evolvesTo.length)];
          console.log(evolution);
          const hasPokemonEvolved = await db.User.findOne({
            discordId: userId,
            "pokemon.name": evolution.species.name
          }).exec();
          console.log("Check if user has evolved pokemon");
          console.log(hasPokemonEvolved);
          if (!hasPokemonEvolved) {
            const newPokeId = evolution.species.url.split("/")[6];
            console.log(newPokeId);
            const newUrl = `https://pokeapi.co/api/v2/pokemon/${newPokeId}/`;
            const newRes = await axios.get(newUrl);
            const newData = await newRes.data;
            console.log(newData);
            // db.User.findOneAndUpdate({
            //   discordId: userId,
            //   "pokemon.name": testPokemon.name
            // }, {$set: {"pokemon.$": {}}})
            // If the user doesn't have the pokemon evolved, just set the evolution and remove the previous form @return
          }
          // Otherwise, take that evolved form and check if it has two stars.
        } else {
          // if NO, Then just give the pokemon a final star
        }
      } else {
        // If the pokemon has a higher evolution level
        // const pokemonPath = currentPath.evolves_to.filter(evolution => {
        //   return evolution.species.name === testPokemon.name
        // });
      }
    }
  };
  evolvePokemon(hasPokemonCheck);

  // Find the pokemon from the user and add a star to it
  await db.User.findOneAndUpdate(
    { discordId: userId, "pokemon.name": hasPokemonCheck.name },
    { $inc: { "pokemon.$.stars": 1 } }
  );
};
