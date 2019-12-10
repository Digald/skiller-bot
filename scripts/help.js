const logger = require("./logger.js");

module.exports = msg => {
  logger(msg);
  msg.reply(
    "Check out https://skiller-bot.herokuapp.com/help for a list of commands"
  );
};
