const axios = require("axios");
const db = require("../../models");
const extractTypeData = require("./extractTypeData");
/**
 * @param {object} hasPokemon pokemon that is already in the user's collection
 * @param {object} spawnPokemon pokemon that will be coming into the user's collection
 * @param {string} evolvesTo the JSON object path for finding the next evolution
 * @param {string} userId the discordId of the user adding a pokemon
 * @return {string} message for the pokemon-catch function to choose next stops
 */
module.exports = async function evolvePokemon(hasPokemon, spawnPokemon, evolvesTo, userId) {
  console.log(hasPokemon);
  // 1) Check if there is a next evolution
  // If yes, Evolve to the next level
  // If no, Add a final star to the pokemon
  if (evolvesTo.length > 0) {
    console.log("Yes there is an evolution available");
    // Get a random item in the array and evolve
    const evolution = evolvesTo[Math.floor(Math.random() * evolvesTo.length)];
    console.log(evolution);
    const hasPokemonEvolved = await db.User.findOne({
      discordId: userId,
      "pokemon.name": evolution.species.name
    }).exec();
    console.log("Check if user has evolved pokemon");
    console.log(hasPokemonEvolved);

    // 2) Check if the user already has the evolved form
    // If yes, check if that pokemon has two stars (recursion)
    // 5) If no, get the evolved form data and update previous form
    if (!hasPokemonEvolved) {
      const newPokeId = evolution.species.url.split("/")[6];
      console.log(newPokeId);
      const newUrl = `https://pokeapi.co/api/v2/pokemon/${newPokeId}/`;
      const newRes = await axios.get(newUrl);
      const newData = await newRes.data;
      const typeData = await extractTypeData(newData);
      const isShiny = spawnPokemon.shiny || hasPokemon.shiny;
      const { name, sprites, stats } = newData;
      const pokeObject = {
        name: name,
        pokeId: newPokeId,
        evolChainUrl: hasPokemon.evolChainUrl,
        stars: 0,
        timesEvolved: hasPokemon.timesEvolved + 1,
        types: typeData,
        spriteUrl: isShiny ? sprites.front_shiny : sprites.front_default,
        shiny: isShiny,
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
      console.log(pokeObject);
      const evolutionUpdate = await db.User.findOneAndUpdate(
        {
          discordId: userId,
          "pokemon.name": hasPokemon.name
        },
        {
          $set: { "pokemon.$": pokeObject }
        }
      );
      console.log(evolutionUpdate);
      return `Your ${hasPokemon.name} has evolved into ${pokeObject.name}!`;
    } else {
      // 4) Check if evolution has two stars
      let evolvedPokemon = hasPokemonEvolved.pokemon.filter(poke => {
        return poke.name === evolution.species.name;
      });
      evolvedPokemon = evolvedPokemon[0];
      console.log("EVOLVED POKEMON");
      console.log(evolvedPokemon);
      if (evolvedPokemon.stars === 2) {
        await db.User.findOneAndUpdate(
          { discordId: userId },
          { $pull: { pokemon: { _id: hasPokemon._id } } }
        ).exec();
        // Recursion
        return evolvePokemon(
          evolvedPokemon,
          spawnPokemon,
          evolution.evolves_to,
          userId
        );
      }
      const isShiny = spawnPokemon.shiny || evolvedPokemon.shiny;
      const currentStars = evolvedPokemon.stars + 1;
      await db.User.updateOne(
        { discordId: userId, "pokemon.name": evolvedPokemon.name },
        {
          $set: {
            "pokemon.$.stars": currentStars,
            "pokemon.$.shiny": isShiny,
            "pokemon.$.spriteUrl": isShiny
              ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${evolvedPokemon.pokeId}.png`
              : evolvedPokemon.spriteUrl
          }
        }
      ).exec();
      await db.User.findOneAndUpdate(
        { discordId: userId },
        { $pull: { pokemon: { _id: hasPokemon._id } } }
      ).exec();
      return `Your ${hasPokemon.name} has evolved into ${evolvedPokemon.name}!`;
    }
  } else {
    console.log("There is no other evolution");
    // 3) Does the final evolution have 3 stars?
    // If yes, insert this new evolution as a new pokemon
    // if No, Then just give the pokemon a final star
    if (hasPokemon.stars !== 3) {
      const currentStars = hasPokemon.stars + 1;
      const isShiny = spawnPokemon.shiny || hasPokemon.shiny;
      const finalPokemon = await db.User.updateOne(
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
              : hasPokemon.spriteUrl
          }
        }
      );
      return `You've maxed out your ${hasPokemon.name}!`;
    }
    const pokemonObj = {
      stars: 0,
      timesEvolved: hasPokemon.timesEvolved,
      types: hasPokemon.types,
      name: hasPokemon.name,
      pokeId: hasPokemon.pokeId,
      evolChainUrl: hasPokemon.evolChainUrl,
      shiny: hasPokemon.shiny || spawnPokemon.shiny,
      spriteUrl: isShiny
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${hasPokemon.pokeId}.png`
        : hasPokemon.spriteUrl,
      hp: hasPokemon.hp,
      atk: hasPokemon.atk,
      def: hasPokemon.def,
      speed: hasPokemon.speed
    };
    db.User.updateOne(
      { discordId: userId },
      { $push: { pokemon: pokemonObj } }
    ).exec();
    return `${hasPokemon.name} has been added to your collection!`;
  }
}; // End function
