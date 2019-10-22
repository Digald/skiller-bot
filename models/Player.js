var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  userDiscordId: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
});

var Player = mongoose.model("Player", PlayerSchema);

// Export the Article model
module.exports = Player;
