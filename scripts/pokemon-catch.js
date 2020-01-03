const axios = require("axios");
const db = require("../models");
const evolvePokemon = require("./helpers/evolvePokemon");
const { RichEmbed } = require("discord.js");
const ColorThief = require("colorthief");

module.exports = async (msg, client, getPokemon) => {
  // Set up embed for users
  const shinyThumb = "/icons/shining.png";
  const setEmbed = async (name, sprite, thumb, userId, evolvedDetails) => {
    const pokeColor = await ColorThief.getColor(sprite).then(color => color);
    const embed = await new RichEmbed()
      .setTitle(
        !evolvedDetails
          ? `${msg.author.username} caught a wild ${name}!`
          : evolvedDetails
      )
      .setThumbnail(thumb)
      .setImage(sprite)
      .setDescription(
        `See ${name} and all of ${msg.author.username}'s pokes at\nhttps://skiller-bot.herokuapp.com/collection/${userId}`
      )
      .setColor(pokeColor);
    return embed;
  };

  const userId = msg.author.id;
  // Grab pokemon spawn object
  const {
    name,
    pokeId,
    evolChainUrl,
    types,
    shiny,
    spriteUrl,
    hp,
    atk,
    spatk,
    def,
    spdef,
    speed
  } = getPokemon;
  const pokemonObj = {
    name,
    pokeId,
    evolChainUrl,
    types,
    shiny,
    spriteUrl,
    hp,
    atk,
    spatk,
    def,
    spdef,
    speed
  };

  // Check if user exists in the database
  const requestingUser = await db.User.findOne({ discordId: userId });

  // if the user does not exist, create user
  if (!requestingUser) {
    const userObject = {
      discordId: userId,
      discordName: msg.author.username,
      discordIcon: msg.author.avatarURL,
      pokemon: [pokemonObj]
    };
    db.User.create(userObject);
    const message = await setEmbed(
      name,
      spriteUrl,
      shiny ? shinyThumb : "",
      userId
    );
    return msg.reply(message);
  }

  // Check if user already has that pokemon since they exist (array)
  const hasPokemonCheck = requestingUser.pokemon.filter(poke => {
    return poke.name === name;
  });
  // Stores single pokemon object
  let hasPokemon;

  // If user does not already have pokemon, add it and return
  if (hasPokemonCheck.length < 1) {
    db.User.updateOne(
      { discordId: userId },
      { $push: { pokemon: pokemonObj } }
    ).exec();
    const message = await setEmbed(
      name,
      spriteUrl,
      shiny ? shinyThumb : "",
      userId
    );
    return msg.reply(message);
  }
  // if user has 1 already, check
  else if (hasPokemonCheck.length > 0) {
    const undevelopedPokemon = hasPokemonCheck.filter(poke => {
      return poke.stars < 3;
    });
    if (undevelopedPokemon.length > 0) {
      hasPokemon = undevelopedPokemon[0];
    } else {
      db.User.updateOne(
        { discordId: userId },
        { $push: { pokemon: pokemonObj } }
      ).exec();
      const message = await setEmbed(
        name,
        spriteUrl,
        shiny ? shinyThumb : "",
        userId
      );
      return msg.reply(message);
    }
  }

  const res = await axios.get(hasPokemon.evolChainUrl);
  // const res = await axios.get("https://pokeapi.co/api/v2/evolution-chain/1/");
  const data = await res.data;
  let currentPath = data.chain.evolves_to;

  // Check if pokemon can evolve or not
  if (hasPokemon.stars === 2) {
    const evolvedMessage = await evolvePokemon(
      hasPokemon,
      getPokemon,
      currentPath,
      userId,
      msg
    );
    const message = await setEmbed(
      name,
      spriteUrl,
      shiny ? shinyThumb : "",
      userId,
      evolvedMessage
    );
    return msg.reply(message);
  }

  const currentStars = hasPokemon.stars + 1;
  const isShiny = getPokemon.shiny || hasPokemon.shiny;
  await db.User.updateOne(
    {
      discordId: userId,
      "pokemon._id": hasPokemon._id
    },
    {
      $set: {
        "pokemon.$.stars": currentStars,
        "pokemon.$.shiny": isShiny,
        "pokemon.$.spriteUrl": isShiny
          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${hasPokemon.pokeId}.png`
          : hasPokemon.spriteUrl,
        "pokemon.$.hp": hasPokemon.hp + 3,
        "pokemon.$.atk": hasPokemon.atk + 3,
        "pokemon.$.spatk": hasPokemon.spatk + 3,
        "pokemon.$.def": hasPokemon.def + 3,
        "pokemon.$.spdef": hasPokemon.spdef + 3,
        "pokemon.$.speed": hasPokemon.speed + 3
      }
    }
  );
  const message = await setEmbed(
    name,
    spriteUrl,
    shiny ? shinyThumb : "",
    userId
  );
  return msg.reply(message);
};
