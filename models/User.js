const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    discordId: String,
    discordIcon: String,
    discordName: String,
    safari: { type: Boolean, default: false },
    pokemon: [
      {
        name: String,
        pokeId: String,
        evolChainUrl: String,
        stars: { type: Number, default: 0 },
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
        spdef: Number,
        speed: Number,

      }
    ],
    team: String
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
