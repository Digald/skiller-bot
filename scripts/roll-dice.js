const logger = require("../logger.js").logger;

exports.rollDice = msg => {
  const randomizer = array => {
    const roll = array[Math.floor(Math.random() * array.length)];
    msg.reply(roll);
    return roll;
  };

  switch (msg.content) {
    case `!d ${msg.content.split(" ")[1]}`:
      // logger(msg);
      const dieNumber = msg.content.split(" ")[1];
      const dieArray = [];
      for (let i = 1; i <= parseInt(dieNumber); i++) {
        dieArray.push(i);
      }
      return randomizer(dieArray);
      break;
  }
};
