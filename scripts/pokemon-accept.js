const logger = require("./logger");
const db = require("../models");
const doBattle = require("./helpers/doBattle");

module.exports = async (msg, client) => {
  logger(msg);
  const userId = msg.author.id;
  const username = msg.author.username;

  // Find the accepting player in the db
  const invitedPlayer = await db.Battle.findOne({
    challengedId: userId
  }).exec();

  // Check if existing player has been invited and their invite hasn't expired
  if (!invitedPlayer) {
    return msg.reply("You weren't even invited to battle... lol");
  } else if (Date.now() - invitedPlayer.inviteTime > 60000) {
    await db.Battle.deleteOne({ _id: invitedPlayer._id });
    return msg.reply("Your previous battle invite has expired.");
  }

  // Record their username into the db
  await db.Battle.updateOne(
    { _id: invitedPlayer._id },
    { challengedName: username }
  );

  // Continue with battle
  // Get all users and grab their pokemon teams
  const { team: team1 } = await db.User.findOne({
    discordId: invitedPlayer.challengerId
  });
  const { team: team2 } = await db.User.findOne({
    discordId: invitedPlayer.challengedId
  });

  // Set up initial variables and who will be attacking first
  let player1Index = 0;
  let player2Index = 0;
  let player1currPokemon = team1[player1Index];
  let player2currPokemon = team2[player2Index];

  /**
   * Initiate the battle parameters with this function
   */
  const battleStart = () => {
    // Decide who will be attacking first
    let pokemonAttackingFirst = {};
    if (player1currPokemon.speed === player2currPokemon.speed) {
      pokemonAttackingFirst =
        Math.random() >= 0.5 ? player1currPokemon : player2currPokemon;
    } else {
      pokemonAttackingFirst =
        player1currPokemon.speed > player2currPokemon
          ? player1currPokemon
          : player2currPokemon;
    }
    // Run the battle and see who the loser is
    const loser = doBattle(
      pokemonAttackingFirst,
      pokemonAttackingFirst._id === player1currPokemon._id
        ? player2currPokemon
        : player1currPokemon
    );
    console.log(loser);
  };

  battleStart();
};
