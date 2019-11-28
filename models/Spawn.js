const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spawnSchema = new Schema(
  {
    caughtBy: {type: Array, default: []},
    lastSpawnTime: Number
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Spawn = mongoose.model("Spawn", spawnSchema);
module.exports = Spawn;
