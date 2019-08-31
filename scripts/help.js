const logger = require("./logger.js");

module.exports = msg => {
  // If the message is "what is my avatar"
  if (msg.content.toLowerCase() === "!help") {
    logger(msg);
    msg.reply("Check out https://digald.github.io/skiller-bot-help/ for a list of commands");
  }
};