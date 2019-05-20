// Discord dependencies
require("dotenv").config();
const Disocrd = require("discord.js");
const token = process.env.BOT_TOKEN;
const client = new Disocrd.Client();
// Bot functions
const rollDice = require("./scripts/roll-dice").rollDice;
const help = require("./scripts/help").help;
const smug = require("./scripts/smug-waifu").smug;
const lewds = require("./scripts/lewds").lewds;
const myAvatar = require("./scripts/my-avatar").myAvatar;
const randomSubPost = require("./scripts/random-subreddit-post").randomSubPost;
const warcraftlogs = require("./scripts/warcraftlogs").warcraftlogs;
const steam = require('./scripts/compareStreamGames.js');

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const responses = 'Type "!help" in chat for a list of commands.'
  // const randomRes = responses[Math.floor(Math.random() * responses.length)];
  // Sends random message in array to discord
  // client.channels.get("203026827567038467").send(responses);
});

client.on("message", msg => {
  help(msg);
  rollDice(msg);
  smug(msg);
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
  const channel = member.guild.channels.find("name", "member-log");
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

client.login(token);
