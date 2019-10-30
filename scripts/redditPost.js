const { fetchPosts } = require("fetch-reddit");
const logger = require("./logger.js");

module.exports = async msg => {
  logger(msg);
  if (msg.channel.name === "officer_lounge" || msg.channel.type === "dm") {
    const desiredSubreddit = msg.content.split(" ")[1];

    if (
      desiredSubreddit.toLowerCase() === "the_donald" ||
      desiredSubreddit.toLowerCase() === "greatawakening"
    ) {
      return;
    }

    fetchPosts(`/r/${desiredSubreddit}`)
      .then(data => {
        const randomPost =
          data.posts[Math.floor(Math.random() * data.posts.length)];
        return msg.reply(`${randomPost.title}\n${randomPost.url}`);
      })
      .catch(err => {
        return msg.reply(
          "There was an error. Make sure the subreddit exists and you typed the name correctly"
        );
        console.error(err);
      });
  } else {
    msg.reply("This is too dangerous to post in general chat.");
  }
};
