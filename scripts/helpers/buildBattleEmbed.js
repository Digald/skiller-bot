const { RichEmbed } = require("discord.js");

/**
 * One pokemon attacking the other in combat
 * @param {object} attackingPoke
 * @param {object} defendingPoke
 * @return {object} The pokemon winner and loser
 */
module.exports = (
  invitedPlayer,
  battleResults,
  challengerResults,
  challengedResults,
  client
) => {
  // Create embed to post from the result
  const embed = new RichEmbed()
    .setTitle(
      `${invitedPlayer.challengerName} vs ${invitedPlayer.challengedName}`
    )
    .attachFiles([
      `./public/battle-recap/${invitedPlayer._id}out.png`,
      "./public/battle-assets/fight-pokemon.png"
    ])
    .setDescription(
      challengerResults.lost
        ? `${invitedPlayer.challengedName}'s ${challengedResults.pokemonName} KOed ${invitedPlayer.challengerName}'s ${challengerResults.pokemonName} with ${battleResults.winner.hp} remaining hp.`
        : "TBD"
    )
    .setImage(`attachment://${invitedPlayer._id}out.png`)
    .setThumbnail("attachment://fight-pokemon.png")
    .setTimestamp();
  // ***PRODUCTION***
  // client.channels.get("441820156197339136").send(embed);
  // ***DEVELOPMENT***
  client.users.get("129038630953025536").send(embed);
};
