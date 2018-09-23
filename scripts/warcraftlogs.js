const warcraft = require("weasel.js");
const axios = require("axios");

exports.warcraftlogs = async msg => {
  if (msg.content.toLowerCase() === `!logs ${msg.content.split(" ")[1]}`) {
    const currentDate = Date.now();
    const weeks = 1814400000;
    const guild = msg.content.split(" ")[1];
    const getLogs = await axios.get(
      `https://www.warcraftlogs.com:443/v1/reports/guild/genesis/ysondre/US?api_key=${
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
            const modifiedCharacter = character;
            character.server = character.server.replace(/\s+/g, "-");
            character.server = character.server.replace("'", "");
            listOfCharacters.push(character);
          }
        });
      }
    });

    const mapCharacterInfo = listOfCharacters.map(async character => {
      try {
        const characterInfo = await axios({
          method: 'GET',
          url: `https://www.warcraftlogs.com/v1/parses/character/${character.name}/${character.server}/${character.region}?api_key=${process.env.WARCRAFT_LOGS}`,
          headers: {'Content-type': 'application/json; charset=utf-8', 'Accept': 'application/json; charset=utf-8'}
        });
        return {name: character.name, info: characterInfo.data};
      } catch (err) {
        console.log(err);
      }
    });
    const mydata = await Promise.all(getCharacterInfo);
    console.log(mydata);
  } // end command if statment
}; // end warcraflogs function
