const Table = require("easy-table");

exports.commands2 = msg => {
  const data = [
    {
      command: "!logs <guild name> <server name>",
      name: "Rank WoW Guild Raiders --->",
      desc: "Example: <!logs oingo-boingo blades-edge> for the Oingo Boingo guild in the Blade's Edge server"
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
};
