const db = require("../models");

module.exports = (msg, client) => {
  const challenged = msg.content.split(' ')[1];
  const userId = msg.author.id;
  const username = msg.author.username;
  //'<@!414591805707780107>' is how to ping a user

  const invitationMessage = `${username} has invited ${challenged} to battle. To accept this battle from ${username}, type "!accept"`
  // Send initial invitation message
  // client.channels.get("441820156197339136").send(embed);
  client.users.get("129038630953025536").send(invitationMessage);
};
