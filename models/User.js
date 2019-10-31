const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    discordId: String,
    pokemon: [
      {
        name: String,
        types: [{ name: String, url: String }],
        doubleDamageTo: [{ name: String }],
        halfDamageTo: [{ name: String }],
        noDamageTo: [{ name: String }],
        stars: { type: Number, default: 0 },
        collected: { type: Number, default: 0 },
        shiny: Boolean,
        spriteUrl: String,
        hp: Number,
        atk: Number,
        def: Number,
        speed: Number
      }
    ],
    team: [
      {
        name: String,
        types: [{ name: String, url: String }],
        doubleDamageTo: [{ name: String }],
        halfDamageTo: [{ name: String }],
        noDamageTo: [{ name: String }],
        stars: { type: Number, default: 0 },
        collected: { type: Number, default: 0 },
        shiny: Boolean,
        spriteUrl: String,
        hp: Number,
        atk: Number,
        def: Number,
        speed: Number
      }
    ],
    safari: Boolean
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
