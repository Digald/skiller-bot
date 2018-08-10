// Discord dependencies 
require("dotenv").config();
const Disocrd = require("discord.js");
const token = process.env.BOT_TOKEN;
const client = new Disocrd.Client();
// Bot functions
const rollDice = require("./scripts/roll-dice").rollDice;
const commands = require("./scripts/commands").commands;
const smug = require("./scripts/smug-waifu").smug;
const lewds = require("./scripts/lewds").lewds;
const myAvatar = require('./scripts/my-avatar').myAvatar;
const randomSubPost = require('./scripts/random-subreddit-post').randomSubPost;

client.on("ready", (msg) => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "skiller-bot") {
    msg.reply("Sup?");
  }
  commands(msg);
  rollDice(msg);
  smug(msg);
  myAvatar(msg);
  lewds(msg);
  randomSubPost(msg);
});

client.on("guildMemberAdd", member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find("name", "member-log");
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

const port = process.env.PORT || 3000;

client.login(token);
