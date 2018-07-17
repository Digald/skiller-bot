exports.rollDice = msg => {
  const randomizer = array => {
    const roll = array[Math.floor(Math.random() * array.length)];
    return msg.reply(roll);
  };

  switch (msg.content) {
    case `!d ${msg.content.split(" ")[1]}`:
      const dieNumber = msg.content.split(" ")[1];
      const dieArray = [];
      for (let i = 1; i <= parseInt(dieNumber); i++) {
        dieArray.push(i);
      }
      randomizer(dieArray);
      break;
  }
};
