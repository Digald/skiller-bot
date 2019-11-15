const logger = require("./logger.js");

module.exports = msg => {
  logger(msg);
  msg.reply(
    "Check out https://digald.github.io/skiller-bot-help/ for a list of commands"
  );
};
