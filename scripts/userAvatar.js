const logger = require("./logger.js");

module.exports = msg => {
  logger(msg);
  if (!msg.author.avatarURL) {
    msg.reply("You don't have an anime profile pic");
  }
  msg.reply(msg.author.avatarURL);
};
