const db = require("../models");

module.exports = (server, handle, app) => {
  // 129038630953025536 my discord id
  server.get("/collection/:discordID", (req, res) => {
    db.User.findOne({
      discordId: req.params.discordID
    }).then(result => {
      return app.render(req, res, "/collection", result);
    });
  });

  server.get("/a", (req, res) => {
    return app.render(req, res, "/a", req.query);
  });

  server.get("/b", (req, res) => {
    return app.render(req, res, "/b", req.query);
  });

  server.get("/posts/:id", (req, res) => {
    return app.render(req, res, "/posts", { id: req.params.id });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });
};
