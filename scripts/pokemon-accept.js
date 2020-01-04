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
  const battleStart = async () => {
    let count = 0;
    while (true) {
      // 1) Check to see if there is a winner or loser
      if (player1Index >= 6) {
        return invitedPlayer.challengerName;
      } else if (player2Index >= 6) {
        return invitedPlayer.challengedName;
      }

      // 2) Decide who will be attacking first
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
      // 3) Run the battle and see who the loser is
      const results = doBattle(
        pokemonAttackingFirst,
        pokemonAttackingFirst._id === player1currPokemon._id
          ? player2currPokemon
          : player1currPokemon
      );
      battleList.push(results);

      // 4) Find out who lost and add a point to the player to bring out the next pokemon
      let challengerResults = {};
      let challengedResults = {};
      if (results.loser._id === player1currPokemon._id) {
        challengerResults = {
          pokemonName: results.loser.name,
          pokemonImg: results.loser.spriteUrl,
          lost: true
        };
        challengedResults = {
          pokemonName: results.winner.name,
          pokemonImg: results.winner.spriteUrl,
          lost: false
        };
        player1Index += 1;
        player1currPokemon = team1[player1Index];
        player2currPokemon = results.winner;
      } else if (results.loser._id === player2currPokemon._id) {
        challengerResults = {
          pokemonName: results.winner.name,
          pokemonImg: results.winner.spriteUrl,
          lost: false
        };
        challengedResults = {
          pokemonName: results.loser.name,
          pokemonImg: results.loser.spriteUrl,
          lost: true
        };
        player2Index += 1;
        player1currPokemon = results.winner;
        player2currPokemon = team2[player2Index];
      } else {
        console.log("Something went wrong when selecting the next pokemon");
      }

      // 5) construct image for battle results
      // Lay the red x over the loser of the round
      const b64 = await mergeImages(
        [`./public/battle-assets/defeated.png`, results.loser.spriteUrl],
        { Canvas: Canvas }
      );
      const b64Image = b64.replace(/^data:image\/png;base64,/, "");
      await require("fs").writeFileSync(
        `./public/battle-recap/${invitedPlayer._id}.png`,
        b64Image,
        "base64",
        err => err
      );
      // Now that the image has been generated, glue the images together
      const leftOutput = await mergeImg(
        [
          challengerResults.lost
            ? `./public/battle-recap/${invitedPlayer._id}.png`
            : challengerResults.pokemonImg,
          `./public/battle-assets/teamStatus${player1Index}.png`
        ],
        { direction: true }
      );
      const rightOutput = await mergeImg(
        [
          challengedResults.lost
            ? `./public/battle-recap/${invitedPlayer._id}.png`
            : challengedResults.pokemonImg,
          `./public/battle-assets/teamStatus${player2Index}.png`
        ],
        { direction: true }
      );

      // 6) Main embed image that will be displayed to the user
      const finalEmbedImage = await mergeImg([
        leftOutput,
        "./public/battle-assets/battle-pokemon.png",
        rightOutput
      ]);
      const embedCallback = (results, challengerResults, challengedResults) => {
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
              ? `${invitedPlayer.challengedName}'s ${challengedResults.name} KOed ${invitedPlayer.challengerName}'s ${challengerResults.name} with ${results.winner.hp} remaining hp.`
              : "TBD"
          )
          .setImage(`attachment://${invitedPlayer._id}out.png`)
          .setThumbnail("attachment://fight-pokemon.png")
          .setTimestamp();
        // ***PRODUCTION***
        // client.channels.get("441820156197339136").send(embed);
        // ***DEVELOPMENT***
        client.users.get("129038630953025536").send(embed);
        count++;
      };
      await finalEmbedImage.write(
        `./public/battle-recap/${invitedPlayer._id}out.png`,
        embedCallback(results, challengerResults, challengedResults)
      ); // end write callback
    } // end while loop
  };
  console.log(battleStart());
};
