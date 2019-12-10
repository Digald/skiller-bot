const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    discordId: String,
    discordIcon: String,
    discordName: String,
    safari: { type: Boolean, default: false },
    teamId: String,
    pokemon: [
      {
        name: String,
        isOnTeam: { type: Boolean, default: false },
        pokeId: String,
        evolChainUrl: String,
        stars: { type: Number, default: 0 },
        timesEvolved: { type: Number, default: 0 },
        types: [
          {
            pokeType: String,
            damageTo: [
              {
                pokeType: String,
                mod: Number
              }
            ],
            damageFrom: [
              {
                pokeType: String,
                mod: Number
              }
            ]
          }
        ],
        shiny: Boolean,
        spriteUrl: String,
        hp: Number,
        atk: Number,
        spatk: Number,
        def: Number,
        spdef: Number,
        speed: Number
      }
    ]
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
