const db = require("../models");

module.exports = (server, handle, app) => {
  // 129038630953025536 my discord id
  server.get("/collection/:discordID", (req, res) => {
    db.User.findOne({
      discordId: req.params.discordID
    }).then(result => {
      if (!result) {
        return app.render(req, res, "/a");
      }
      // Sort pokemon by their Id number from Gen 1 to Gen 8
      const pokeArr = result.pokemon;
      pokeArr.sort((a, b) => {
        return parseInt(a.pokeId) - parseInt(b.pokeId);
      });
      result.pokemon = pokeArr;
      return app.render(req, res, "/collection", result);
    });
  });
  
  server.all("*", (req, res) => {
    return handle(req, res);
  });
};
