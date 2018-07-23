const logger = require("../logger.js").logger;

exports.myAvatar = msg => {
  // If the message is "what is my avatar"
  if (msg.content === "!myavatar") {
    logger(msg);
    // Send the user's avatar URL
    msg.reply(msg.author.avatarURL);
  }
};
