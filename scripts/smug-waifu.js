const { fetchSubreddit } = require("fetch-subreddit");

exports.smug = async msg => {
  if (msg.content === "!smugs") {
    fetchSubreddit("Smugs")
      .then(urls => {
        const arrayOfURLS = urls[0].urls.slice(1);
        const randomSmug = arrayOfURLS[Math.floor(Math.random() * arrayOfURLS.length)];
        return msg.reply(randomSmug);
      })
      .catch(err => {
        console.error(err);
      });
  }
};
