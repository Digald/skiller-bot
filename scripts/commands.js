const Table = require("easy-table");

exports.commands = msg => {
  if (msg.content === "!help") {
    const data = [
      {
        command: "!d <n>",
        name: "Roll Dice ->",
        desc: "Get a random number between 1 & n."
      },
      {
        command: "!smugs",
        name: "Smug Waifu Picture ->",
        desc: "Posts a random picture of about 20 of a smug faced waifu."
      },
      { command: "More to come..." }
    ];

    const t = new Table();

    data.forEach(function(item) {
      t.cell("Command", item.command);
      t.cell("Name", item.name);
      t.cell("Description", item.desc);
      t.newRow();
      t.newRow();
    });
    console.log(t.toString());
    const reply = `https://i.ytimg.com/vi/_vboPFgBUzI/maxresdefault.jpg \n\n ${t.toString()}`;
    return msg.reply(reply);
  }
};
