const db = require("../models");
const logger = require("./logger");
//'<@!414591805707780107>' is how to ping a user

module.exports = async (msg, client) => {
  logger(msg);
  const challenged = msg.content.split(" ")[1];
  const userId = msg.author.id;
  const username = msg.author.username;
  const userIcon = msg.author.avatarURL;

  // Check to see if the player is an existing player
  const existingPlayer = await db.User.findOne({ discordId: userId });
  if (!existingPlayer || existingPlayer.team.length < 1) {
    return msg.reply("You are not eligible to battle.");
  }

  // Check to see if user has an active battle instance already
  const existingBattleInstance = await db.Battle.findOne({
    challengerId: userId
  }).exec();

  // If battle instance already exists, terminate battle requeset
  if (existingBattleInstance) {
    if (Date.now() - existingBattleInstance.inviteTime < 60000) {
      return msg.reply(
        "Resolve your current battle request before starting a new one."
      );
    }
    // If the battle instance expired, delete it and continue
    await db.Battle.deleteOne({ _id: existingBattleInstance._id });
  }

  // Make sure that player cannot challenge themselves
  const challengedId = challenged.match(/\d+/gm)[0];
  // ***PRODUCTION***
  if (challengedId === userId) {
    return msg.reply("You can't battle yourself.");
  }
  // ***DEVELOPMENT****

  // Save battle instance to db
  const recordBattleRequest = await db.Battle.create({
    challengerId: userId,
    challengerName: username,
    challengerIcon: userIcon,
    challengedId,
    inviteTime: Date.now()
  });

  if (!recordBattleRequest) {
    return msg.reply(
      "Something went wrong with creating your battle request. Make sure you typed in the command and challenger's name correctly."
    );
  }
  const invitationMessage = `${username} has invited ${challenged} to battle. To accept this battle from ${username}, type "!accept" within 1 minute to start.`;

  // Send initial invitation message
  // ***PRODUCTION***
  // client.channels.get("441820156197339136").send(invitationMessage);
  // ***DEVELOPMENT***
  client.users.get("129038630953025536").send(invitationMessage);
};
