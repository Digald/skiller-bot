const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const battleSchema = new Schema(
  {
    challenger: String,
    challenged: String,
    inviteTime: Number
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Battle = mongoose.model("Battle", battleSchema);
module.exports = Battle;
