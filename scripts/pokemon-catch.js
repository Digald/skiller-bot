const db = require("../models");
const logger = require("./logger.js");

module.exports = async msg => {
  logger(msg);
  const userId = msg.author.id;
  const getPokemon = await db.Spawn.findOne();
  if (getPokemon.caughtBy.indexOf(userId) !== -1) {
    return msg.reply(`You've already caught this ${getPokemon.name}.`);
  }
  db.Spawn.update(
    { name: getPokemon.name },
    { $push: { caughtBy: msg.author.id } }
  );
  const {
    name,
    pokeId,
    evolChain,
    types,
    shiny,
    spriteUrl,
    hp,
    atk,
    def,
    speed
  } = getPokemon;
  const spawnObject = {
    name,
    pokeId,
    evolChain,
  };
  const userObject = {};
  // db.User.findOneAndUpdate(
  //   { discordId: userId },
  //   { $push: { pokemon: spawnObject } }
  // ).then(result => {
  //   if (!result) {
  //     return db.User.create(userObject);
  //   }
  //   return;
  // });
  return msg.reply(`${getPokemon.name} has been added to your collection!`);
};
