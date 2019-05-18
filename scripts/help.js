const logger = require("../logger.js").logger;

exports.help = msg => {
  // If the message is "what is my avatar"
  if (msg.content.toLowerCase() === "!help") {
    logger(msg);
    msg.reply("https://digald.github.io/skiller-bot-help/");
  }
};