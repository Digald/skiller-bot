const roll = require("./roll");
const smugs = require("./smugs");
const help = require("./help");
const avatar = require("./userAvatar");
const reddit = require("./redditPost");
const pokemonUpdate = require("./pokemon-update");
const pokemonSpawn = require('./pokemon-spawn');

module.exports = (msg, client) => {
  const userMsg = msg.content.toLowerCase();
  switch (userMsg) {
    case "!help":
      help(msg);
      break;
    case "!updateme":
      pokemonUpdate(msg);
      break;
    case "!catch":
      pokemonSpawn(msg, client);
      break;
    case "!smugs":
      smugs(msg);
      break;
    case "!mypic":
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
