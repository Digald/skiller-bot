const logger = require("../logger.js").logger;

exports.myAvatar = msg => {
  // If the message is "what is my avatar"
  if (msg.content.toLowerCase() === "!myavatar") {
    logger(msg);
    // Send the user's avatar URL
    if (!msg.author.avatarURL) {
      msg.reply("You don't have an anime profile pic");
    }
    msg.reply(msg.author.avatarURL);
  }
};
