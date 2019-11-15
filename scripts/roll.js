const logger = require("./logger.js");

module.exports = msg => {
  logger(msg);
  
  const randomizer = array => {
    const roll = array[Math.floor(Math.random() * array.length)];
    msg.reply(roll);
    return roll;
  };

  const dieNumber = msg.content.split(" ")[1];
  const dieArray = [];
  for (let i = 1; i <= parseInt(dieNumber); i++) {
    dieArray.push(i);
  }
  return randomizer(dieArray);
};
