const { fetchSubreddit } = require("fetch-subreddit");
const logger = require("../logger.js").logger;

exports.lewds = async msg => {
  if (msg.content === "!lewds") {
    logger(msg);
    if (msg.channel.name === "officer_lounge" || msg.channel.type === "dm") {
      const subreddits = ["ecchi", "Rule34LoL", "ZettaiRyouiki"];
      fetchSubreddit(subreddits)
        .then(urls => {
          const arrayOfURLS = [...urls[0].urls, ...urls[1].urls.slice(1), ...urls[2].urls];
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
