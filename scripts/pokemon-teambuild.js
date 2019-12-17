const uniqid = require("uniqid");
const db = require("../models");

module.exports = (msg, client) => {
  // create unique key
  const uniqueKey = uniqid();
  const user = msg.author.id;
  // Save that key in the database
  db.User.updateOne({ discordId: user }, { $set: { teamId: uniqueKey } }).then(
    result => {
      if (!result) {
        msg.reply("Sorry I don't recognize you currently.")
      }
      // Send private message to user with the link
      client.users
        .get(user)
        .send(
          `This is a secret URL to build your pokemon team. DO NOT SHARE THIS WITH ANYONE. If someone happens to get their hands on your unique number, ${uniqueKey}, you can always get another by typing !teambuilder in Discord.\nhttps://skiller-bot.herokuapp.com/teambuilder/${uniqueKey}`
        );
    }
  );
};
