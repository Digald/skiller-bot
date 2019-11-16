const roll = require("./roll");
const smugs = require("./smugs");
const help = require("./help");
const avatar = require("./userAvatar");
const reddit = require("./redditPost");
const test_pokemon_spawn = require("./pokemon-test");
const pokemonCatch = require("./pokemon-catch");

module.exports = (msg, client) => {
  const userMsg = msg.content.toLowerCase();
  switch (userMsg) {
    case "!help":
      help(msg);
      break;
    case "!p":
      // test_pokemon_spawn(client);
      break;
    case "!catch":
      pokemonCatch(msg);
      break;
    case "!smugs":
      smugs(msg);
      break;
    case "!myavatar":
      avatar(msg);
      break;
    case "<@414591805707780107>":
      msg.reply("Sup?");
      break;
  }

  switch (userMsg.split(" ")[0]) {
    case "!roll":
      if (userMsg.split(" ")[1]) {
        roll(msg);
      }
      break;
    case "!reddit":
      if (userMsg.split(" ")[1]) {
        reddit(msg);
      }
      break;
  }
};
