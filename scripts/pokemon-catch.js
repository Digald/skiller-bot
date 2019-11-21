const axios = require("axios");
const db = require("../models");
const evolvePokemon = require("./helpers/evolvePokemon");
const { RichEmbed } = require("discord.js");
const ColorThief = require("colorthief");

module.exports = async (msg, client, getPokemon) => {
  // Set up embed for users
  const shinyThumb = "https://i.ibb.co/8j61Qpb/shining.png";
  const setEmbed = async (name, sprite, thumb, userId) => {
    const pokeColor = await ColorThief.getColor(sprite).then(color => color);
    const embed = await new RichEmbed()
      .setTitle(`${msg.author.username} caught a wild ${name}!`)
      .setThumbnail(thumb)
      .setImage(sprite)
      .setDescription(
        `See ${name} and all of ${msg.author.username}'s pokes at https://skiller-bot.herokuapp.com/collection/${userId}`
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
  // If the pokemon has already been caught by the user
  const spawn = await db.Spawn.findOne({});
  if (spawn.caughtBy.indexOf(userId) !== -1) {
    return msg.reply(
      `You've alright caught a pokemon recently. Try again later.`
    );
  }

  // Update the caught list for the pokemon
  db.Spawn.updateOne({}, { $push: { caughtBy: msg.author.id } }).exec();

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
    // return msg.reply(
    //   `${getPokemon.name} has been added to your collection!\nCheck out your collection at https://skiller-bot.herokuapp.com/collection/${msg.author.id}`
    // );
    const message = await setEmbed(
      name,
      spriteUrl,
      shiny ? shinyThumb : "",
      userId
    );
    return client.users.get("129038630953025536").send(message);
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
    // return msg.reply(
    //   `${getPokemon.name} has been added to your collection!\nCheck out your collection at https://skiller-bot.herokuapp.com/collection/${msg.author.id}`
    // );
    const message = await setEmbed(
      name,
      spriteUrl,
      shiny ? shinyThumb : "",
      userId
    );
    return client.users.get("129038630953025536").send(message);
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
      // return msg.reply(
      //   `${getPokemon.name} has been added to your collection!\nCheck out your collection at https://skiller-bot.herokuapp.com/collection/${msg.author.id}`
      // );
      const message = await setEmbed(
        name,
        spriteUrl,
        shiny ? shinyThumb : "",
        userId
      );
      return client.users.get("129038630953025536").send(message);
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
      userId
    );
    return msg.reply(
      evolvedMessage +
        `\nCheck out your collection at https://skiller-bot.herokuapp.com/collection/${msg.author.id}`
    );
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
  // return msg.reply(
  //   `${getPokemon.name} has been added to your collection!\nCheck out your collection at https://skiller-bot.herokuapp.com/collection/${msg.author.id}`
  // );
  const message = await setEmbed(
    name,
    spriteUrl,
    shiny ? shinyThumb : "",
    userId
  );
  return client.users.get("129038630953025536").send(message);
};
