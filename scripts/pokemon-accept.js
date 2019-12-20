const logger = require("./logger");
const db = require("../models");

module.exports = (msg, client) => {
  logger(msg);
  
};
