const db = require('../models');
const ColorThief = require("colorthief");
const { RichEmbed } = require("discord.js");

// 468570185847013379 private message id for skiller-bot
// pokemon channel id 441820156197339136
// spawnPokemon();
// setInterval(spawnPokemon, 43200 * 1000);
module.exports = client => {
  async function spawnPokemon() {
    // Make initial insertion in database
    db.Spawn.findOne().then(result => {
      if (!result) {
        db.Spawn.create();
        return;
      }
      // When spawning a new pokemon, reset catches
      db.Spawn.updateOne({_id: result._id}, {$set: {caughtBy: []}})
      return;
    });

    // Set up embed
    const sprite = "https://img.icons8.com/plasticine/100/000000/pokeball.png";
    const thumb = "https://img.icons8.com/bubbles/50/000000/question-mark.png";
    const pokeColor = await ColorThief.getColor(sprite).then(color => color);
    // Submit Embed to Discord for users to see
    const embed = await new RichEmbed()
      .setTitle(`A wild pokemon is ready to be caught!`)
      .setThumbnail(thumb)
      .setImage(sprite)
      .setFooter("!catch to add to your collection")
      .setColor(pokeColor);
    client.channels.get("441820156197339136").send(embed);
  }
  // spawnPokemon();
  // setInterval(spawnPokemon, 43200 * 1000);
};
