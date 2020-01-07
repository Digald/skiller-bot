const mergeImages = require("merge-images");
const { Canvas, Image } = require("canvas");
const fs = require("fs");
const mergeImg = require("merge-img");

const db = require("../models");
const logger = require("./logger");
const doBattle = require("./helpers/doBattle");
const buildBattleEmbed = require("./helpers/buildBattleEmbed");
Canvas.Image = Image;

module.exports = async (msg, client) => {
  logger(msg);
  const userId = msg.author.id;
  const username = msg.author.username;
  const userIcon = msg.author.avatarUrl;

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
  // Set the challenged person's name and icon
  invitedPlayer.challengedName = username;
  invitedPlayer.challengedIcon = userIcon;

  // Contruct versus image
  const determineIcon = image =>
    !image ? "./public/battle-recap/discord-logo.png" : image;
  const imgArr = [
    determineIcon(invitedPlayer.challengerIcon),
    determineIcon(invitedPlayer.challengedIcon)
  ];
  mergeImg(imgArr).then(img => {
    img.write(`./public/battle-recap/${invitedPlayer._id}versus.png`);
  });

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
  const battleStart = async () => {
    let count = 1;
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
      const battleResults = doBattle(
        pokemonAttackingFirst,
        pokemonAttackingFirst._id === player1currPokemon._id
          ? player2currPokemon
          : player1currPokemon
      );

      // 4) Find out who lost and add a point to the player to bring out the next pokemon
      let challengerResults = {};
      let challengedResults = {};
      if (battleResults.loser._id === player1currPokemon._id) {
        challengerResults = {
          pokemonName: battleResults.loser.name,
          pokemonImg: battleResults.loser.spriteUrl,
          lost: true
        };
        challengedResults = {
          pokemonName: battleResults.winner.name,
          pokemonImg: battleResults.winner.spriteUrl,
          lost: false
        };
        player1Index += 1;
        player1currPokemon = team1[player1Index];
        player2currPokemon = battleResults.winner;
      } else if (battleResults.loser._id === player2currPokemon._id) {
        challengerResults = {
          pokemonName: battleResults.winner.name,
          pokemonImg: battleResults.winner.spriteUrl,
          lost: false
        };
        challengedResults = {
          pokemonName: battleResults.loser.name,
          pokemonImg: battleResults.loser.spriteUrl,
          lost: true
        };
        player2Index += 1;
        player1currPokemon = battleResults.winner;
        player2currPokemon = team2[player2Index];
      } else {
        console.log("Something went wrong when selecting the next pokemon");
      }

      // 5) construct image for battle results
      // Lay the red x over the loser of the round
      const b64 = await mergeImages(
        [`./public/battle-assets/defeated.png`, battleResults.loser.spriteUrl],
        { Canvas: Canvas }
      );
      const b64Image = b64.replace(/^data:image\/png;base64,/, "");
      await fs.writeFileSync(
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

      const finalImagePromise = (...args) => {
        return new Promise((resolve, reject) => {
          finalEmbedImage.write(...args, () => resolve("done")); // end write callback
        });
      };
      await finalImagePromise(
        `./public/battle-recap/${invitedPlayer._id}out.png`
      );
      buildBattleEmbed(
        invitedPlayer,
        battleResults,
        challengerResults,
        challengedResults,
        count,
        client
      );
      count += 1;
    } // end while loop
  };
  const winner = await battleStart();
  if (winner) {
    db.Battle.deleteOne({ _id: invitedPlayer._id }).then(data => {
      // Delete generated images at the end of embed send
      fs.unlinkSync(`./public/battle-recap/${invitedPlayer._id}.png`);
      fs.unlinkSync(`./public/battle-recap/${invitedPlayer._id}out.png`);
      return fs.unlinkSync(`./public/battle-recap/${invitedPlayer._id}versus.png`);
    });
  }
  return;
};
