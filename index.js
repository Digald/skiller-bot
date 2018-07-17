require("dotenv").config();
const Disocrd = require("discord.js");
const client = new Disocrd.Client();
const token = process.env.BOT_TOKEN;
const rollDice = require("./scripts/roll-dice").rollDice;
const commands = require('./scripts/commands').commands;
const smug = require('./scripts/smug-waifu').smug;
const lewds = require('./scripts/lewds').lewds;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
  commands(msg);
  rollDice(msg);
  smug(msg);
  // lewds(msg);
});

client.login(token);
