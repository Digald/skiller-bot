const axios = require("axios");
const ColorThief = require("colorthief");
const { RichEmbed } = require("discord.js");
const db = require("../models");

module.exports = (msg, client) => {
  async function spawnPokemon() {
    // Exclude Mythical and Legendaries for now
    const exclusionList = [
      "151",
      "251",
      "385",
      "386",
      "490",
      "489",
      "491",
      "492",
      "493",
      "494",
      "647",
      "648",
      "649",
      "719",
      "720",
      "721",
      "801",
      "802",
      "807",
      "145",
      "144",
      "146",
      "150",
      "244",
      "245",
      "243",
      "249",
      "250",
      "377",
      "378",
      "379",
      "380",
      "381",
      "382",
      "383",
      "384",
      "480",
      "481",
      "482",
      "483",
      "484",
      "485",
      "487",
      "488",
      "486",
      "638",
      "639",
      "640",
      "641",
      "642",
      "645",
      "643",
      "644",
      "646",
      "716",
      "717",
      "718",
      "772",
      "773",
      "785",
      "786",
      "787",
      "788",
      "789",
      "790",
      "791",
      "792",
      "800"
    ];
    // Return random number
    const randomNum = () => Math.round(Math.random() * 807);

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

    const url = `https://pokeapi.co/api/v2/pokemon/${basicForm.id}/`;
    const res = await axios.get(url);
    const data = await res.data;

    // Select Pokemon Color
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

    // Submit Embed
    const embed = await new RichEmbed()
      .setTitle(`A wild ${data.name} appears!`)
      .setThumbnail(thumb)
      .setImage(sprite)
      .setFooter("!catch to add to your collection")
      .setColor(pokeColor);
    // https://www.serebii.net/pokemongo/pokemon/719.png for more detailed sprites
    client.channels.get("468570185847013379").send(embed);
    const extractTypes = data.types.map(type => {
      return { name: type.name, url: type.url };
    });
    const { stats } = data.stats;
    console.log(stats);
    const hp = stats[5].base_stat;
    const atk = stats[4].base_stats;
    const spatk = stats[2].base_stats;
    const def = stats[3].base_stats;
    const spdef = stats[1].base_stat;
    const speed = stats[0].base_stat;
    const pokemon = {
      name: data.name,
      evolChain: basicForm.chainUrl,
      types: extractTypes,
      shiny: shiny,
      spriteUrl: sprite,
      hp: hp,
      atk: atk > spatk ? atk : spatk,
      def: def > spdef ? def : spdef,
      speed: speed
    };
    console.log(pokemon);
    // db.Spawn.create()
  }
  setInterval(spawnPokemon, 1000);
};
