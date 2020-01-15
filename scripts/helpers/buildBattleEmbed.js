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
  // Battle Messages *************************************
  const challengerLostMessage = `${invitedPlayer.challengedName}'s ${challengedResults.pokemonName} KOed ${invitedPlayer.challengerName}'s ${challengerResults.pokemonName}!`;
  const challengerWonMessage = `${invitedPlayer.challengerName}'s ${challengerResults.pokemonName} KOed ${invitedPlayer.challengedName}'s ${challengedResults.pokemonName} with ${battleResults.winner.hp} remaining hp.`;
  const breakdownMessage = `${battleResults.winner.name}'s hp: ${battleResults.winner.hp}\n${battleResults.loser.name} damage on-hit: ${battleResults.loser.damage}\n${battleResults.winner.name} damage on-hit: ${battleResults.winner.damage}`;

  // Determine what player Icon to show ********************************
  let winnerIcon = "";
  challengerResults.lost ? winnerIcon = invitedPlayer.challengedIcon : winnerIcon = invitedPlayer.challengerIcon;
  // Create embed to post from the result ********************************
  const embed = new RichEmbed()
    .attachFiles([
      `${process.cwd()}/public/battle-recap/${invitedPlayer._id}out.png`,
      `${process.cwd()}/public/battle-assets/fight-pokemon.png`
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
    .setThumbnail(winnerIcon) //winner of fight
    .setTimestamp();
  // ***PRODUCTION***
  // client.channels.get("667075999535464461").send(embed);
  // ***DEVELOPMENT***
  client.users.get("129038630953025536").send(embed);
  return;
};
