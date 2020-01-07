const fs = require("fs");
const { RichEmbed } = require("discord.js");

/**
 * Build the final embed to show who won the current fight
 * @param {object} invitedPlayer
 * @param {object} battleResults
 * @param {object} challengerResults
 * @param {object} challengedResults
 * @param {integer} count
 *
 * @param {object} client
 * @return none
 */
module.exports = (
  invitedPlayer,
  battleResults,
  challengerResults,
  challengedResults,
  count,
  client
) => {
  const challengerLostMessage = `${invitedPlayer.challengedName}'s ${challengedResults.pokemonName} KOed ${invitedPlayer.challengerName}'s ${challengerResults.pokemonName} with ${battleResults.winner.hp} remaining hp.`;
  const challengerWonMessage = `${invitedPlayer.challengerName}'s ${challengerResults.pokemonName} KOed ${invitedPlayer.challengedName}'s ${challengedResults.pokemonName} with ${battleResults.winner.hp} remaining hp.`;
  const breakdownMessage = `Remaining hp for ${battleResults.winner.name}: ${battleResults.winner.hp}\n${battleResults.loser.name} damage per hit: ${battleResults.loser.damage}\n${battleResults.winner.name} damage per hit: ${battleResults.winner.damage}`;
  // Create embed to post from the result
  const embed = new RichEmbed()
    .attachFiles([
      `./public/battle-recap/${invitedPlayer._id}out.png`,
      `./public/battle-recap/${invitedPlayer._id}versus.png`,
      "./public/battle-assets/fight-pokemon.png"
    ])
    .setColor("#00ff00")
    .setAuthor(
      `${invitedPlayer.challengerName} vs ${invitedPlayer.challengedName}`,
      "attachment://fight-pokemon.png"
    )
    .setTitle(`Round #${count}`)
    .setDescription(
      challengerResults.lost ? challengerLostMessage : challengerWonMessage
    )
    .addField("Breakdown", breakdownMessage)
    .setImage(`attachment://${invitedPlayer._id}out.png`)
    .setThumbnail(`attachment://${invitedPlayer._id}versus.png`)
    .setTimestamp();
  // .setFooter(`Round #${count}`);
  // ***PRODUCTION***
  // client.channels.get("441820156197339136").send(embed);
  // ***DEVELOPMENT***
  client.users.get("129038630953025536").send(embed);
  return;
};
