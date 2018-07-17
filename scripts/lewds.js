const { fetchSubreddit } = require("fetch-subreddit");

exports.lewds = async msg => {
  if (msg.content === "!lewds") {
    const subreddits = ["ecchi", "Rule34LoL"];
    fetchSubreddit(subreddits)
      .then(urls => {
        // console.log(urls);
        const arrayOfURLS = [...urls[0].urls, ...urls[1].urls.slice(1)];
        // console.log(arrayOfURLS);
        const randomSmug =
          arrayOfURLS[Math.floor(Math.random() * arrayOfURLS.length)];
        return msg.reply(randomSmug);
      })
      .catch(err => {
        console.error(err);
      });
  }
};
