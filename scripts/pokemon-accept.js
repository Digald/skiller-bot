const { RichEmbed } = require("discord.js");
const mergeImages = require("merge-images");
const { Canvas, Image } = require("canvas");
Canvas.Image = Image;
const mergeImg = require("merge-img");
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
  let battleList = [];
  /**
   * Initiate the battle parameters with this function
   */
  let count = 0;
  const battleStart = async () => {
    while (true) {
      // Check to see if there is a winner or loser
      if (player1Index >= 5) {
        return invitedPlayer.challengerName;
      } else if (player2Index >= 5) {
        return invitedPlayer.challengedName;
      }

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
      const results = doBattle(
        pokemonAttackingFirst,
        pokemonAttackingFirst._id === player1currPokemon._id
          ? player2currPokemon
          : player1currPokemon
      );
      battleList.push(results);

      // Find out who lost and add a point to the player to bring out the next pokemon
      let challenger = { pokemonImg: "", lost: false };
      let challenged = { pokemonImg: "", lost: false };
      if (results.loser._id === player1currPokemon._id) {
        challenger = { pokemonImg: results.loser.spriteUrl, lost: true };
        challenged = { pokemonImg: results.winner.spriteUrl, lost: false };
        player1Index++;
        player1currPokemon = team1[player1Index];
        player2currPokemon = results.winner;
      } else if (results.loser._id === player2currPokemon._id) {
        challenger = { pokemonImg: results.winner.spriteUrl, lost: false };
        challenged = { pokemonImg: results.loser.spriteUrl, lost: true };
        player2Index++;
        player1currPokemon = results.winner;
        player2currPokemon = team2[player2Index];
      } else {
        console.log("Something went wrong when selecting the next pokemon");
      }

      // construct image for battle results
      console.log(player1Index);
      console.log(player2Index);
      // Lay the red x over the loser of the round
      mergeImages(
        [results.loser.spriteUrl, `./public/battle-assets/defeated.png`],
        { Canvas: Canvas }
      ).then(async b64 => {
        let image = b64.replace(/^data:image\/png;base64,/, "");
        require("fs").writeFileSync(
          `./public/battle-recap/${invitedPlayer._id}.png`,
          image,
          "base64",
          err => err
        );
        // Now that the image has been generated, glue the images together
        const leftOutput = await mergeImg(
          [
            challenger.lost
              ? `./public/battle-recap/${invitedPlayer._id}.png`
              : challenger.pokemonImg,
            `./public/battle-assets/teamStatus${player1Index}.png`
          ],
          { direction: true }
        );
        const rightOutput = await mergeImg(
          [
            challenged.lost
              ? `./public/battle-recap/${invitedPlayer._id}.png`
              : challenged.pokemonImg,
            `./public/battle-assets/teamStatus${player2Index}.png`
          ],
          { direction: true }
        );
        const finalEmbedImage = await mergeImg([
          leftOutput,
          "./public/battle-assets/battle-pokemon.png",
          rightOutput
        ]);
        finalEmbedImage.write(`./public/battle-recap/out${count}.png`);
        count++
      });
    } // end while loop
  };

  // Create embed to post from the result
  // const embed = new RichEmbed()
  //   .setTitle(`${player1currPokemon.name} vs ${player2currPokemon.name}`)
  //   .setDescription(`${results.winner.name} ${results.winner.hp}`);
  // // ***PRODUCTION***
  // // client.channels.get("441820156197339136").send(embed);
  // // ***DEVELOPMENT***
  // client.users.get("129038630953025536").send(embed);
  console.log(battleStart());
};
