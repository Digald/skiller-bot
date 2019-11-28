const db = require("../models");
const ColorThief = require("colorthief");
const { RichEmbed } = require("discord.js");

// 468570185847013379 private message id for skiller-bot
// pokemon channel id 441820156197339136
// setInterval(spawnPokemon, 43200 * 1000);
module.exports = client => {
  async function announce() {
    // Make initial insertion in database
    db.Spawn.findOne().then(result => {
      if (!result) {
        db.Spawn.create({ caughtBy: [], lastSpawnTime: Date.now() });
        return;
      }
      // When spawning a new pokemon, reset catches
      db.Spawn.updateOne(
        { _id: result._id },
        { $set: { caughtBy: [],  lastSpawnTime: Date.now()} }
      ).exec();
      return;
    });

    // Set up embed
    const thumb = "https://img.icons8.com/color/48/000000/pokeball-2.png";
    const pokeColor = await ColorThief.getColor(thumb).then(color => color);
    // Submit Embed to Discord for users to see
    const embed = await new RichEmbed()
      .setTitle(`A wild pokemon appears!`)
      .setThumbnail(thumb)
      .setDescription("!catch to add to your collection")
      .setColor(pokeColor);
    // client.channels.get("441820156197339136").send(embed);
    client.users.get("129038630953025536").send(embed);
  }
  // announce();
  setInterval(announce, 28800 * 1000);
};
