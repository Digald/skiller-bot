const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    discordId: String,
    discordIcon: String,
    pokemon: [
      {
        name: String,
        pokeId: String,
        evolChainUrl: String,
        stars: { type: Number, default: 0 },
        collected: { type: Number, default: 0 },
        timesEvolved: {type: Number, default: 0},
        types: [
          {
            pokeType: String,
            doubleDamageTo: [String],
            halfDamageTo: [String],
            noDamageTo: [String]
          }
        ],
        shiny: Boolean,
        spriteUrl: String,
        hp: Number,
        atk: Number,
        def: Number,
        speed: Number,

      }
    ],
    team: [
      {
        name: String,
        pokeId: String,
        evolChainUrl: String,
        stars: { type: Number, default: 0 },
        collected: { type: Number, default: 0 },
        types: [
          {
            pokeType: String,
            doubleDamageTo: [String],
            halfDamageTo: [String],
            noDamageTo: [String]
          }
        ],
        shiny: Boolean,
        spriteUrl: String,
        hp: Number,
        atk: Number,
        def: Number,
        speed: Number,
      }
    ],
    safari: { type: Boolean, default: false }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
