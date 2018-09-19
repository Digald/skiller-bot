const warcraft = require("weasel.js");
warcraft.setApiKey("94bad0bd1c1ccdb2bd55de10af0dc1d9");

exports.warcraftlogs = msg => {
  if (msg.content.toLowerCase() === `!logs ${msg.content.split(" ")[1]}`) {
    const user = msg.content.split(" ")[1];
    const params = {};
    
    warcraft.getParsesCharacter(user, "ysondre", "us", params, async function(
      err,
      data
    ) {
      if (err) console.log(err);
      msg.reply(data[0]);
    });
  }
//   const params = {};
  //   warcraft.getReportsGuild("genesis", "ysondre", "us", params, function(
  //     err,
  //     data
  //   ) {
  //     if (err) console.log(err);
  //     console.log(data);
  //   });
  //   warcraft.getParsesCharacter("alkazar", "ysondre", "us", params, function(
  //     err,
  //     data
  //   ) {
  //     if (err) console.log(err);
  //     console.log(data[0].talents);
  //   });
};
