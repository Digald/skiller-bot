exports.commands = msg => {
  if (msg.content === "!help") {
    const reply =
      "https://i.ytimg.com/vi/_vboPFgBUzI/maxresdefault.jpg" +
      "\n\nRoll Dice---------------!d <die number>" +
      "\n\nSmug Waifu Pic---------------!smugs" +
      "\n\nMore commands to be added later.";
    return msg.reply(reply);
  }
};
