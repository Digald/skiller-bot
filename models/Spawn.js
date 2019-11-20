const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spawnSchema = new Schema(
  {
    caughtBy: [String]
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// const spawnSchema = new Schema(
//   {
//     name: String,
//     pokeId: String,
//     evolChainUrl: String,
//     types: [
//       {
//         pokeType: String,
//         damageTo: [
//           {
//             pokeType: String,
//             mod: Number
//           }
//         ],
//         damageFrom: [
//           {
//             pokeType: String,
//             mod: Number
//           }
//         ]
//       }
//     ],
//     shiny: Boolean,
//     spriteUrl: String,
//     hp: Number,
//     atk: Number,
//     spatk: Number,
//     def: Number,
//     spdef: Number,
//     speed: Number,
//     caughtBy: [String]
//   },
//   { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
// );

const Spawn = mongoose.model("Spawn", spawnSchema);
module.exports = Spawn;
