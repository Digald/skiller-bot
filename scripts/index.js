const roll = require("./roll");
const smugs = require("./smugs");
const help = require("./help");
const avatar = require("./userAvatar");
const reddit = require("./redditPost");
const testmon = require("./pokemon-test");

// pokemon channel id 441820156197339136
module.exports = msg => {
  if (msg.content.toLowerCase() === "!help") {
    help(msg);
  } else if (msg.content.toLowerCase() === "!pokemon") {
    testmon(msg);
  } else if (msg.content.split(" ")[0].toLowerCase() === "!roll") {
    roll(msg);
  } else if (
    msg.content.toLowerCase() === `!reddit ${msg.content.split(" ")[1]}`
  ) {
    reddit(msg);
  } else if (msg.content.toLowerCase() === "!smugs") {
    smugs(msg);
  } else if (msg.content.toLowerCase() === "!myavatar") {
    avatar(msg);
  } else if (msg.content === "<@414591805707780107>") {
    msg.reply("Sup?");
  }
};
