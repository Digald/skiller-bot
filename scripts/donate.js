const logger = require("./logger.js");

module.exports = msg => {
  logger(msg);
  msg.reply(`Your support is appreciated! https://www.paypal.me/digald`);
};
