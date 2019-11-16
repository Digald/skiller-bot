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
const mongoose = require("mongoose");
const axios = require('axios');
// Discord Deps
const Discord = require("discord.js");
const token = process.env.BOT_TOKEN;
const client = new Discord.Client();
const scripts = require("./scripts");
const startPokemon = require("./scripts/pokemon-spawn");

app.prepare().then(() => {
  const server = express();
  const mongooseURL = process.env.MONGODB_URI || "mongodb://localhost:27017/skillerbot"
  mongoose.connect(
    mongooseURL,
    {
      useNewUrlParser: true,
      useFindAndModify: false
    }
  );
  // Listen for Discord Bot_____________________________________
  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    startPokemon(client);
  });
  
  client.on("message", msg => {
    scripts(msg, client);
  });
  // End Discord Scripts__________________________________________
  client.login(token);

  // Server Routes
  routes(server, handle, app);

  // Listen for express server
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });

  setInterval(function() {
    axios.get("https://skiller-bot.herokuapp.com/");
  }, 300000); // every 5 minutes (300000)
});
