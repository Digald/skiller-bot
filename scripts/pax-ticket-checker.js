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
        const displayAvailability = `${threeday}\n${friday}\n${saturday}\n${sunday}`
        msg.reply(displayAvailability);
        return;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
