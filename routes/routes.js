const db = require("../models");

module.exports = (server, handle, app) => {
  server.get("/pokemon/:discordID", (req, res) => {
    db.User.findOne({
      discordId: req.params.discordID
    }).then(result => {
      console.log(result);
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
