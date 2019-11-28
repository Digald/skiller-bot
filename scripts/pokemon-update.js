const db = require("../models");
const logger = require("./logger");

module.exports = async msg => {
  logger(msg);
  const id = msg.author.id;
  const avatar = msg.author.avatarURL;
  const user = await db.User.findOne({ discordId: id }).exec();
  if (!user) {
    return msg.reply("I don't have data for this user");
  }
  if (avatar === user.discordIcon) {
    return msg.reply("Your discord icon is already up to date");
  }
  return db.User.updateOne({ discordId: id }, { discordIcon: avatar }).then(
    result => {
      return msg.reply("Your discord icon has been updated!");
    }
  );
};
