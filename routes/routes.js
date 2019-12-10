const db = require("../models");

module.exports = (server, handle, app) => {
  // 129038630953025536 my discord id
  server.get("/api/users", async (req, res) => {
    // Need to omit user tokens after team battles are implemented.
    db.User.find().then(result => {
      result.forEach(user => {
        user.teamId = null;
        user.pokemon.forEach(poke => {
          poke.types = null;
        });
      });
      return res.json(result);
    });
    return;
  });

  server.post('/api/add-to-team', (req, res) => {
    console.log(req.body);
    res.send(req.body);
  });

  server.get("/api/user/:discordID", (req, res) => {
    db.User.findOne({
      discordId: req.params.discordID
    }).then(result => {
      if (!result) {
        return res.json({});
      }
      result.teamId = null;
      // Sort pokemon by their Id number from Gen 1 to Gen 8
      const pokeArr = result.pokemon;
      pokeArr.sort((a, b) => {
        return parseInt(a.pokeId) - parseInt(b.pokeId);
      });
      result.pokemon = pokeArr;
      return res.json(result);
    });
  });

  server.get("/api/user-with-teamid/:teamId", (req, res) => {
    db.User.findOne({
      teamId: req.params.teamId
    }).then(result => {
      if (!result) {
        return res.json({});
      }
      // Sort pokemon by their Id number from Gen 1 to Gen 8
      const pokeArr = result.pokemon;
      pokeArr.sort((a, b) => {
        return parseInt(a.pokeId) - parseInt(b.pokeId);
      });
      result.pokemon = pokeArr;
      return res.json(result);
    });
  });

  server.get("/collection/:discordId", (req, res) => {
    return app.render(req, res, "/collection", { user: req.params.discordId });
  });

  server.get("/teambuilder/:teamId", (req, res) => {
    return app.render(req, res, "/teambuilder", { user: req.params.teamId });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });
};
