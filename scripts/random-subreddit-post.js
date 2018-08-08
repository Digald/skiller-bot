const { fetchPosts } = require("fetch-reddit");
const logger = require("../logger.js").logger;

exports.randomSubPost = async msg => {
  if (msg.content === `!reddit ${msg.content.split(" ")[1]}`) {

    if (msg.channel.name === "officer_lounge" || msg.channel.type === "dm") {

      logger(msg);

      const desiredSubreddit = msg.content.split(" ")[1];

      const subreddits = [desiredSubreddit];

      if (desiredSubreddit.toLowerCase() === 'the_donald' || desiredSubreddit.toLowerCase() === 'greatawakening') {
        return;
      }
      
      fetchPosts(`/r/${desiredSubreddit}`).then(data => {
        const randomPost =
          data.posts[Math.floor(Math.random() * data.posts.length)];
        return msg.reply(`${randomPost.title}\n${randomPost.url}`)
      }).catch(err => {
        console.error(err);
      });
    }
    
    else {
      msg.reply("This is too dangerous to post in general chat.");
    }

  }
};
