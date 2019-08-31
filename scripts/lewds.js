const { fetchSubreddit } = require("fetch-subreddit");
const logger = require("./logger.js");

module.exports = async msg => {
  if (msg.content.toLowerCase() === "!lewds") {
    logger(msg);
    if (msg.channel.name === "officer_lounge" || msg.channel.type === "dm") {
      const subreddits = ["ecchi", "Rule34LoL", "hentai", "overwatchnsfw"];
      fetchSubreddit(subreddits)
        .then(urls => {
          const arrayOfURLS = [...urls[0].urls, ...urls[1].urls.slice(1), ...urls[2].urls, ...urls[3].urls];
          const randomLewd =
            arrayOfURLS[Math.floor(Math.random() * arrayOfURLS.length)];
          return msg.reply(randomLewd);
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      msg.reply("baka");
    }
  }
};
