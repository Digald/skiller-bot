const logger = require("./logger.js");

module.exports = msg => {
  const randomizer = array => {
    const roll = array[Math.floor(Math.random() * array.length)];
    msg.reply(roll);
    return roll;
  };
  if (msg.content.split(" ")[0] === "!d") {
    logger(msg);
    const dieNumber = msg.content.split(" ")[1];
    const dieArray = [];
    for (let i = 1; i <= parseInt(dieNumber); i++) {
      dieArray.push(i);
    }
    return randomizer(dieArray);
  }
};
