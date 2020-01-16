const roll = require("./roll");
const smugs = require("./smugs");
const help = require("./help");
const mypic = require("./mypic");
const reddit = require("./redditPost");
const donate = require("./donate");
const pokemonUpdate = require("./pokemon-update");
const pokemonSpawn = require("./pokemon-spawn");
const pokemonTeamBuild = require("./pokemon-teambuild");
const pokemonBattle = require('./pokemon-battle');
const pokemonAccept = require('./pokemon-accept');

module.exports = (msg, client) => {
  const userMsg = msg.content.toLowerCase();
  // ***PRODUCTION***
  // ***DEVELOPMENT***
  // if (msg.author.id !== "129038630953025536") {
  //   return;
  // }
  // basic command switch statment
  switch (userMsg) {
    case "!donate":
      donate(msg);
      break;
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
      mypic(msg);
      break;
    case "!teambuilder":
      pokemonTeamBuild(msg, client);
      break;
    case "!accept":
      pokemonAccept(msg, client);
      break;
    case "<@414591805707780107>":
      msg.reply("Sup?");
      break;
  }
  // commands with multiple arguments switch statement
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
    case "!battle":
      if (userMsg.split(" ")[1]) {
        pokemonBattle(msg, client);
      }
  }
};
