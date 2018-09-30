const logger = require("../logger.js").logger;
const axios = require("axios");

exports.warcraftlogs = async msg => {
  if (
    msg.content.toLowerCase() ===
    `!logs ${msg.content.toLowerCase().split(" ")[1]} ${
      msg.content.toLowerCase().split(" ")[2]
    }`
  ) {
    logger(msg);
    const currentDate = Date.now();
    const weeks = 1209600000;
    const guild = msg.content.toLowerCase().split(" ")[1];
    const server = msg.content.toLowerCase().split(" ")[2];
    const getLogs = await axios.get(
      `https://www.warcraftlogs.com:443/v1/reports/guild/${guild}/${server}/US?api_key=${
        process.env.WARCRAFT_LOGS
      }`
    );

    /**
     * @return {array} Array of arrays of characters that have appeared in each log
     **/
    const mapCharacterData = await getLogs.data.map(async report => {
      let getChracters;
      // DIfference between right now and start of each report
      const timeDiff = currentDate - report.start;
      // Check to see if reports are within the past 21 days
      if (timeDiff <= weeks) {
        // Get all characters that have appeared in reports for the last 21 days
        getChracters = await axios.get(
          `https://www.warcraftlogs.com:443/v1/report/fights/${
            report.id
          }?api_key=${process.env.WARCRAFT_LOGS}`
        );
        if (getChracters.data.exportedCharacters) {
          return getChracters.data.exportedCharacters;
        }
      }
    });
    const characterData = await Promise.all(mapCharacterData);

    /**
     * @return {array} Array of characters and relevent data with no dubplicates
     **/
    const listOfCharacters = [];
    characterData.map(currentLog => {
      if (currentLog) {
        currentLog.map(character => {
          const arrOfNames = listOfCharacters.map(i => {
            return i.name;
          });
          if (arrOfNames.indexOf(character.name) < 0) {
            character.server = character.server.replace(/\s+/g, "-");
            character.server = character.server.replace("'", "");
            listOfCharacters.push(character);
          }
        });
      }
    });

    /**
     * @return {array} Array of characters and all fight data associated with them
     **/
    const mapCharacterInfo = listOfCharacters.map(async character => {
      try {
        const myurl = `https://www.warcraftlogs.com/v1/parses/character/${
          character.name
        }/${character.server}/${character.region}?api_key=${
          process.env.WARCRAFT_LOGS
        }`;
        const characterInfo = await axios({
          method: "GET",
          url: encodeURI(myurl)
        });
        if (characterInfo.data) {
          return { name: character.name, info: characterInfo.data };
        }
      } catch (err) {
        console.log(err);
      }
    });
    const nameAndInfo = await Promise.all(mapCharacterInfo);

    /**
     * @return {array} Array of characters and their average percentile
     **/
    const nameAndAverage = [];
    nameAndInfo.map(async character => {
      if (character) {
        const parses = [];
        character.info.map(fight => {
          const timeDiff = currentDate - fight.startTime;
          if (timeDiff <= weeks) {
            parses.push(fight.percentile);
          }
        }); // end fight map
        const average = parses.reduce((p, c) => p + c) / parses.length;
        nameAndAverage.push({
          name: character.name,
          class: character.info[0].class,
          spec: character.info[0].spec,
          average
        });
      }
    }); // end nameAndInfo map

    const sortedArrayOfRankings = nameAndAverage.sort(
      (a, b) => b.average - a.average
    );

    /**
     * @return {array} An array of the strings to display highest to lowest ranking characters
     **/
    // const scoreDifference = 100 - sortedArrayOfRankings[0].average;
    const sortedStringOfRankings = sortedArrayOfRankings.map((character, i) => {
      return `Place ${i + 1}, ${
        character.name
      }(${character.spec} ${character.class}) with a relative score of ${character.average.toFixed(1)}`;
    });
    const reply = `Best guild perfomers are as follows: \n${sortedStringOfRankings.join(
      "\n"
    )} \n__***Note, These rankings are based off of all existing logs within the past 14 days. There may be missing or extra data based on the warcraftlogs API and may skew the accuracy of these rankings. ***__`;
    msg.reply(reply);
  } // end command if statment
}; // end warcraflogs function
