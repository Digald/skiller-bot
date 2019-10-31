const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spawnSchema = new Schema(
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
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Spawn = mongoose.model("Spawn", spawnSchema);
module.exports = Spawn;
