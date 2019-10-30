// Core Deps
require("dotenv").config();
const express = require("express");
const next = require("next");
// Server Deps
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const routes = require("./routes/routes");
const handle = app.getRequestHandler();
// Discord Deps
const Discord = require("discord.js");
const token = process.env.BOT_TOKEN;
const client = new Discord.Client();
const scripts = require('./scripts');

app.prepare().then(() => {
  const server = express();

  // Listen for Discord Bot
  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  // Discord Scripts here___________________________________________
  client.on("message", msg => {
    scripts(msg);
  });
  // End Discord Scripts__________________________________________
  client.login(token);

  // Server Routes
  routes(server, handle);

  // Listen for express server
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
