const axios = require("axios");
axios.defaults.timeout = 60000;
const logger = require("../logger.js").logger;

module.exports = async msg => {
  if (msg.content.split(" ")[0] === "!steam") {
    const arrOfPlayers = msg.content.split(" ").slice(1);

    try {
      // Make sure you are comparing two or more players
      if (arrOfPlayers.length < 2) {
        msg.reply(
          "You need to compare two or more steam users for this to work"
        );
        return;
      }

      // Loop through each player and return an array of all their games.
      const eachPlayerListOfGames = arrOfPlayers.map(async steamId => {
        const res1 = await axios.get(
          `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${
            process.env.STEAM_KEY
          }&steamid=${steamId}&format=json`
        );
        const arrOfGameIds = res1.data.response.games;
        const idsOnly = arrOfGameIds.map(game => {
          return game.appid;
        });
        return idsOnly;
      });

      // Final array of array of player's games
      const returnPromise = await Promise.all(eachPlayerListOfGames);

      // Determine how many players you need to compare
      const numOfPlayers = returnPromise.length;

      // Create interesection prototype to perform for each pair of players
      Array.prototype.intersection = function(arr) {
        return this.filter(function(e) {
          return arr.indexOf(e) > -1;
        });
      };

      // Perform first intersection for two players
      let totalIntersection = returnPromise[0].intersection(returnPromise[1]);

      // Loop through all player arrays and get a single intersection array
      if (numOfPlayers > 2) {
        for (let i = 2; i < numOfPlayers; i++) {
          totalIntersection = totalIntersection.intersection(returnPromise[i]);
        }
      }
      // Translate all appids into game names
      const parsedGamesArr = totalIntersection.map(async id => {
        const res = await axios.get(
          `http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${
            process.env.STEAM_KEY
          }&appid=${id}`
        );

        const gameName = res.data.game.gameName;
        if (gameName && gameName !== undefined && gameName !== "") {
          return gameName;
        }
        return;
      });

      // Wait for promise and sort out array for any blanks, undefineds, or undesired titles
      const promise_prasedGamesArr = await Promise.all(parsedGamesArr);
      const finalListOfGames = promise_prasedGamesArr.filter(game => {
        return game !== undefined && !game.startsWith("ValveTestApp");
      });
      msg.reply(finalListOfGames.join(" --- "));

      // If something went wrong with the whole process, catch error and return message
    } catch (err) {
      console.log(err);
      msg.reply(
        "There was an error. Check that you have the correct steamId for each player or try again later."
      );
      return;
    }
  } // end message if
}; // end function
