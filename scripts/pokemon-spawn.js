const axios = require("axios");
const ColorThief = require("colorthief");
const { RichEmbed } = require("discord.js");
const db = require("../models");

// pokemon channel id 441820156197339136
// https://www.serebii.net/pokemongo/pokemon/719.png for more detailed sprites
module.exports = (client) => {

  async function spawnPokemon() {
    
    // Exclude Mythical and Legendaries for now
    const exclusionList = [ "151", "251", "385", "386", "490", "489", "491", "492", "493", "494", "647", "648", "649", "719", "720", "721", "801", "802", "807", "145", "144", "146", "150", "244", "245", "243", "249", "250", "377", "378", "379", "380", "381", "382", "383", "384", "480", "481", "482", "483", "484", "485", "487", "488", "486", "638", "639", "640", "641", "642", "645", "643", "644", "646", "716", "717", "718", "772", "773", "785", "786", "787", "788", "789", "790", "791", "792", "800" ];
    
    // Return random number
    const randomNum = () => Math.ceil(Math.random() * 807);

    // Finds basic pokemon form based on random choice
    const findBasicForm = async pokeUrl => {
      const url = pokeUrl;
      const res = await axios.get(url);
      const data = await res.data;
      const { id, name, evolves_from_species, evolution_chain } = data;
      return {
        id,
        name,
        from: evolves_from_species ? evolves_from_species.url : null,
        chainUrl: evolution_chain.url
      };
    };

    // Find random pokemon number & Make sure it is in the basic form
    let randomPoke = randomNum();
    while (exclusionList.indexOf(randomPoke.toString()) !== -1) {
      randomPoke = randomNum();
    }
    let basicForm = await findBasicForm(
      `https://pokeapi.co/api/v2/pokemon-species/${randomPoke}/`
    );
    while (basicForm.from != null) {
      basicForm = await findBasicForm(basicForm.from);
    }

    // Make call to get final pokemon data
    const url = `https://pokeapi.co/api/v2/pokemon/${basicForm.id}/`;
    const res = await axios.get(url);
    const data = await res.data;

    // Check if pokemon is shiny or not, get theme color
    const { sprites } = data;
    const shinyChance = Math.floor(Math.random() * 10);
    let sprite;
    let thumb;
    let shiny = false;
    if (shinyChance === 0) {
      sprite = sprites.front_shiny;
      shiny = true;
      thumb = "https://i.ibb.co/8j61Qpb/shining.png";
    } else {
      sprite = sprites.front_default;
      thumb = "";
    }
    const pokeColor = await ColorThief.getColor(sprite).then(color => color);

    // Submit Embed to Discord for users to see
    const embed = await new RichEmbed()
      .setTitle(`A wild ${data.name} appears!`)
      .setThumbnail(thumb)
      .setImage(sprite)
      .setFooter("!catch to add to your collection")
      .setColor(pokeColor);
    client.channels.get("441820156197339136").send(embed);
    
    // Collect Type Data for database insertion
    const extractTypesData = data.types.map(async type => {
      const damageResponse = await axios.get(type.type.url);
      const damageRelations = damageResponse.data.damage_relations;
      const {
        double_damage_to,
        half_damage_to,
        no_damage_to
      } = damageRelations;
      const doubleDamageTo = double_damage_to.map(type => type.name);
      const halfDamageTo = half_damage_to.map(type => type.name);
      const noDamageTo = no_damage_to.map(type => type.name);
      return {
        pokeType: type.type.name,
        doubleDamageTo,
        halfDamageTo,
        noDamageTo
      };
    });
    const p = Promise.all(extractTypesData);
    const typesData = await p.then(v => v);

    // Insert all data into Spawn schema
    const { stats } = data;
    const pokemon = {
      name: data.name,
      pokeId: basicForm.id,
      evolChainUrl: basicForm.chainUrl,
      types: typesData,
      shiny: shiny,
      spriteUrl: sprite,
      hp: stats[5].base_stat,
      atk:
        stats[4].base_stat > stats[2].base_stat
          ? stats[4].base_stat
          : stats[2].base_stat,
      def:
        stats[3].base_stat > stats[1].base_stat
          ? stats[3].base_stat
          : stats[1].base_stat,
      speed: stats[0].base_stat
    };

    // Make final insertion in database
    db.Spawn.findOneAndUpdate(pokemon).then(result => {
      if (result === null) {
        db.Spawn.create(pokemon);
        return;
      }
      return;
    });
  }
  // spawnPokemon();
  // setInterval(spawnPokemon, 43200 * 1000);
};

