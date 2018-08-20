const axios = require("axios");
const cheerio = require("cheerio");

exports.pax = msg => {
  if (msg.content === "!pax") {
    axios
      .get("http://south.paxsite.com/registration")
      .then(res => {
        const $ = cheerio.load(res.data);
        const threeday = $("#badges .three-day").text().trim();
        const friday = $("#badges .friday").text().trim();
        const saturday = $("#badges .saturday").text().trim();
        const sunday = $("#badges .sunday").text().trim();
        const countdown = $("#countdown span").text().trim();
        const countdownParsed = countdown.replace("Days", "Days, ").replace("Hrs", "Hrs, ").replace("Mins", "Mins, ");
        const displayAvailability = `\nAvailable Badges:\n${threeday}\n${friday}\n${saturday}\n${sunday}\n\nCountdown to PAX: ${countdownParsed}\nhttps://www.showclix.com/event/ml2z850b05`
        msg.reply(displayAvailability);
        return;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
