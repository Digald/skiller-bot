const { fetchSubreddit } = require("fetch-subreddit");
const axios = require("axios");
const logger = require("../logger.js").logger;

const grabInitialSmugs = async () => {
  const imgurData = await axios.get(
    `https://api.imgur.com/3/album/KXSvb/authorize?client_id=${
      process.env.IMGUR_ID
    }`
  );
  const megaCollectionOfSmugs = imgurData.data.data.images.map(i => {
    return i.link;
  });
  return megaCollectionOfSmugs;
};

exports.smug = msg => {
  if (msg.content === "!smugs") {
    logger(msg);
    fetchSubreddit("Smugs")
      .then(async urls => {
        const initalSmugs = await grabInitialSmugs();
        const arrayOfURLS = urls[0].urls.slice(1);
        const totalSmugs = [...arrayOfURLS, ...initalSmugs];
        const randomSmug =
          totalSmugs[Math.floor(Math.random() * totalSmugs.length)];
        return msg.reply(randomSmug);
      })
      .catch(err => {
        console.error(err);
      });
  }
};
