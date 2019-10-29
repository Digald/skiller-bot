require("dotenv").config();
const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
// Discord Deps
const Discord = require("discord.js");
const token = process.env.BOT_TOKEN;
const client = new Discord.Client();

// Listen for Discord Bot
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Discord Scripts here____________________________________________
const rollDice = require("./scripts/diceRoll");

client.on("message", msg => {
  rollDice(msg);
  if (msg.content === "<@414591805707780107>") {
    msg.reply("Sup?");
  }
});
// End Discord Scripts__________________________________________
client.login(token);

app.prepare().then(() => {
  const server = express();

  server.get("/a", (req, res) => {
    return app.render(req, res, "/a", req.query);
  });

  server.get("/b", (req, res) => {
    return app.render(req, res, "/b", req.query);
  });

  server.get("/posts/:id", (req, res) => {
    return app.render(req, res, "/posts", { id: req.params.id });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  
  // Listen for express server
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
