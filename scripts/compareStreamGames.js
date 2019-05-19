const SteamAPI = require("steamapi");
const steam = new SteamAPI(process.env.STEAM_KEY);
const logger = require("../logger.js").logger;

module.exports = async msg => {
  if (msg.content.toLowerCase() === "!steam") {
    logger(msg);
    const steamId = await steam.resolve("https://steamcommunity.com/id/lolcatz00");
    console.log(steamId);
    const playerData = await steam.getUserSummary(steamId);
    console.log(playerData);
  }
};
