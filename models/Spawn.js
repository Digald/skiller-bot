const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spawnSchema = new Schema(
  {
    name: String,
    pokeId: String,
    evolChainUrl: String,
    types: [{
      pokeType: String,
      doubleDamageTo: [String],
      halfDamageTo: [String],
      noDamageTo: [String]
    }],
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
