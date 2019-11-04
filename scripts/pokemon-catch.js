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
  console.log(hasPokemonCheck);
  if (hasPokemonCheck.length < 1) {
    db.User.updateOne(
      { discordId: userId },
      { $push: { pokemon: pokemonObj } }
    ).exec();
    return msg.reply(`${getPokemon.name} has been added to your collection!`);
  }
  // Check the stars of the pokemon
  hasPokemonCheck = hasPokemonCheck[0];
  if (hasPokemonCheck.stars === 2) {
    // Does this pokemon evolve or not?
    const res = await axios.get(hasPokemonCheck[0].evolChainUrl);
    const data = await res.data;
    let currentPath = data.chain;
    if (currentPath.species.name === hasPokemonCheck.name) {
      if (currentPath.evolves_to.length > 0) {
        
      }
    }
  }

  // Find the pokemon from the user and add a star to it
  await db.User.findOneAndUpdate(
    { discordId: userId, "pokemon.name": hasPokemonCheck.name },
    { $inc: { "pokemon.$.stars": 1 } }
  );
};
