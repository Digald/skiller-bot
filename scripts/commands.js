const Table = require("easy-table");
const logger = require("../logger.js").logger;
// Additional Commands
const commands2 = require("./commands2").commands2;

exports.commands = msg => {
  if (msg.content.toLowerCase() === "!help") {
    logger(msg);
    const data = [
      {
        command: "!d <n>",
        name: "Dice Roll --->",
        desc: "Get a random number between 1 & n."
      },
      {
        command: "!smugs",
        name: "Random Smug Waifu Picture --->",
        desc: "Posts a random smug faced waifu from imgur and reddit."
      },
      {
        command: "!myavatar",
        name: "Your Discord Avatar --->",
        desc: "Posts your discord avatar as an image."
      },
      {
        command: "!pax",
        name: "PAX Badge availability for 2019 --->",
        desc:
          "Checks website to see if badges are still available in real time."
      },
      {
        command: "!lewds",
        name: "Lewd pic --->",
        desc: "OFFICER ONLY. Self explanatory."
      },
      {
        command: "!reddit <subreddit>",
        name: "Random Post --->",
        desc:
          "OFFICER ONLY. Posts a random title and url from requested subreddit page."
      },
      {
        command: "-",
        name: "-",
        desc: "-"
      }
    ];

    const t = new Table();

    data.forEach(function(item) {
      t.cell("Command", item.command);
      t.cell("Name", item.name);
      t.cell("Description", item.desc);
      t.newRow();
      t.newRow();
    });
    const reply = t.toString();
    msg.reply(reply);

    commands2(msg);
  }
};
