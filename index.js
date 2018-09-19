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
const myAvatar = require("./scripts/my-avatar").myAvatar;
const randomSubPost = require("./scripts/random-subreddit-post").randomSubPost;
const pax = require("./scripts/pax-ticket-checker").pax;
const warcraftlogs = require('./scripts/warcraftlogs').warcraftlogs;

// warcraftlogs();

client.on("ready", msg => {
  console.log(`Logged in as ${client.user.tag}!`);
  const responses = [
    "Sup Bitches",
    "Howdy-do",
    "",
    "01001011 01101001 01101100 01101100 00100000 01100001 01101100 01101100 00100000 01101000 01110101 01101101 01100001 01101110 01110011",
    "I'm going to ban someone at random everytime I come online. Good luck everybody else!"
  ];
  const randomRes = responses[Math.floor(Math.random() * responses.length)];
  // Sends random message in array to discord
  // client.channels.get("203026827567038467").send(randomRes);
});

client.on("message", msg => {
  commands(msg);
  rollDice(msg);
  smug(msg);
  myAvatar(msg);
  lewds(msg);
  randomSubPost(msg);
  pax(msg);
  warcraftlogs(msg);
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
