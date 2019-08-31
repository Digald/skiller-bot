// Discord dependencies
require("dotenv").config();
const Disocrd = require("discord.js");
const token = process.env.BOT_TOKEN;
const client = new Disocrd.Client();
// Bot functions
const rollDice = require("./scripts/diceRoll");
const help = require("./scripts/help");
const smugs = require("./scripts/smugs");
const lewds = require("./scripts/lewds");
const myAvatar = require("./scripts/getUserAvatar");
const randomSubPost = require("./scripts/getRedditPost");
const warcraftlogs = require("./scripts/warcraftlogs");
const steam = require('./scripts/compareStreamGames.js');

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  help(msg);
  rollDice(msg);
  smugs(msg);
  myAvatar(msg);
  lewds(msg);
  randomSubPost(msg);
  warcraftlogs(msg);
  steam(msg);
  if (msg.content === "<@414591805707780107>") {
    msg.reply("Sup?");
  }
});

client.on("guildMemberAdd", member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

client.login(token);
