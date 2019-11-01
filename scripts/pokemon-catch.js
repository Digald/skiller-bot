const db = require("../models");
const logger = require("./logger.js");

module.exports = async msg => {
  logger(msg);
  const userId = msg.author.id;
  const getPokemon = await db.Spawn.findOne();
  if (getPokemon.caughtBy.indexOf(userId) === -1) {
    db.Spawn.update({}, { $push: { caughtBy: msg.author.id } });
  }
  const pokemonObject = [];
  const userObject = {};
  const updateUserPokemon = await db.User.findOneAndUpdate(
    { discordId: userId },
    { $push: { pokemon: pokemonObject } }
  );
  if (updateUserPokemon === null) {
    db.User.create(userObject);
  }
  msg.reply(`${getPokemon.name} has been added to your collection!`);
};
