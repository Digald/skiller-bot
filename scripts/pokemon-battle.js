const db = require("../models");
const logger = require("./logger");
//'<@!414591805707780107>' is how to ping a user

module.exports = async (msg, client) => {
  logger(msg);
  const challenged = msg.content.split(" ")[1];
  const userId = msg.author.id;
  const username = msg.author.username;

  // Check to see if user has an active battle instance already
  const battle = await db.Battle.find({challenger: userId}).exec();
  console.log(battle);

  const invitationMessage = `${username} has invited ${challenged} to battle. To accept this battle from ${username}, type "!accept"`;

  // Send initial invitation message
  // client.channels.get("441820156197339136").send(embed);
  client.users.get("129038630953025536").send(invitationMessage);
};
