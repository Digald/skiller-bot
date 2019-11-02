const db = require("../models");
const logger = require("./logger.js");

module.exports = async msg => {
  logger(msg);
  const userId = msg.author.id;
  const getPokemon = await db.Spawn.findOne();
  if (getPokemon.caughtBy.indexOf(userId) !== -1) {
    return msg.reply(`You've already caught this ${getPokemon.name}.`)
  }
  db.Spawn.updateOne({id: getPokemon.id}, { $push: { caughtBy: msg.author.id } }).then(val => console.log(val));
  const pokemonObject = [];
  const userObject = {};
  // const updateUserPokemon = await db.User.findOneAndUpdate(
  //   { discordId: userId },
  //   { $push: { pokemon: pokemonObject } }
  // );
  // if (updateUserPokemon === null) {
  //   db.User.create(userObject);
  // }
  return msg.reply(`${getPokemon.name} has been added to your collection!`);

};
